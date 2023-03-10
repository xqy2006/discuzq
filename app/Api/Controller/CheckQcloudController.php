<?php

/**
 * Copyright (C) 2020 Tencent Cloud.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace App\Api\Controller;

use App\Common\ResponseCode;
use App\Repositories\UserRepository;
use App\Models\Setting;
use Discuz\Base\DzqAdminController;
use Discuz\Qcloud\QcloudStatisticsTrait;
use TencentCloud\Common\Credential;
use TencentCloud\Common\Profile\ClientProfile;
use TencentCloud\Common\Profile\HttpProfile;
use TencentCloud\Ms\V20180408\Models\DescribeUserBaseInfoInstanceRequest;
use TencentCloud\Ms\V20180408\MsClient;

class CheckQcloudController extends DzqAdminController
{
//    use QcloudStatisticsTrait;

    protected function checkRequestPermissions(UserRepository $userRepo)
    {
        return true;
    }

    public function main()
    {
        $setting = Setting::query()->whereIn('key', ['qcloud_secret_id', 'qcloud_secret_key'])->get()->toArray();
        $setting = array_column($setting, null, 'key');
        $qcloudSecretId = !empty($setting['qcloud_secret_id']) ? $setting['qcloud_secret_id']['value'] : '';
        $qcloudSecretKey = !empty($setting['qcloud_secret_key']) ? $setting['qcloud_secret_key']['value'] : '';
        $ret['data']['attributes']['isBuildQcloud'] = false;
        if (empty($qcloudSecretId) || empty($qcloudSecretKey)) {
            $this->outPut(ResponseCode::SUCCESS, '', $ret);
        }
        $cred = new Credential($qcloudSecretId, $qcloudSecretKey);
        $httpProfile = new HttpProfile();
        $httpProfile->setEndpoint('ms.tencentcloudapi.com');
        $clientProfile = new ClientProfile();
        $clientProfile->setHttpProfile($httpProfile);
        $client = new MsClient($cred, '', $clientProfile);
        $req = new DescribeUserBaseInfoInstanceRequest();
        $params = '{}';
        $req->fromJsonString($params);
        $resp = $client->DescribeUserBaseInfoInstance($req);
        if (empty($resp->UserUin)) {
            $this->outPut(ResponseCode::SUCCESS, '', $ret);
        }
        $ret['data']['attributes']['isBuildQcloud'] = true;

        $cache = app('cache');
        $is_uin_statis = $cache->get('uin_statis_check_qcloud');
        if (empty($is_uin_statis)) {
//            $this->uinStatis();
            $cache->put('uin_statis_check_qcloud', 1, 24 * 60 * 60);
        }

        $this->outPut(ResponseCode::SUCCESS, '', $ret);
    }
}
