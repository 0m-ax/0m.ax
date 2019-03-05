/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/blog.html","489f7dc281b8c601afe60afc1925bb95"],["/css/critical.css","6b437f9406dedcd611b974bf2df16ddb"],["/css/flag-icon.css","8f553f7ddb0b608977c3cba6121c2502"],["/css/index.css","6e4254d4fa54e7da29c69fea37f21a89"],["/da/blog.html","e745e85be101ebc899810970ec4600a5"],["/da/index.html","d028a19bb5058b83a64af2fb2b58556c"],["/da/posts.html","269a05a3ea893b888f7e0fcb1ee86ba7"],["/en/blog.html","bb52b9b6aec0966b3a3722ac8edc2828"],["/en/index.html","9e8dfcc5f628b7530ec563a5048ff493"],["/en/posts.html","8f990cd5f1341eb6c4135e603d61229a"],["/img/adgwry.com_(Pixel 2 XL)_L.png","408b310df79818112fce6fb2c5ab808d"],["/img/adgwry.com_(Pixel 2 XL)_P.png","022709b9f4fed7a965284efb72a91245"],["/img/f-t.win_(Pixel 2 XL)_P.png","1fdb1e38ed249c793ad5774a65d773e9"],["/img/flags/1x1/ad.svg","455610c8415075b27f63b2664104c18e"],["/img/flags/1x1/ae.svg","45934bd6652bc182a651c708c36d7ac7"],["/img/flags/1x1/af.svg","a13f0653e6dcdb06f5f230053ca3099e"],["/img/flags/1x1/ag.svg","3a5ea3b1718048af44d0cc64e00071c7"],["/img/flags/1x1/ai.svg","87e774ca1fb6155cde731bbcede8355d"],["/img/flags/1x1/al.svg","f6b6aec2135943d42e3835e6b6b7694b"],["/img/flags/1x1/am.svg","4abb041a89c367da01caaf510b363692"],["/img/flags/1x1/ao.svg","96c64f2eb90109ce5c71664d7dc002f7"],["/img/flags/1x1/aq.svg","f9b282f6976aba0c736d4e6de188ac4a"],["/img/flags/1x1/ar.svg","3117fba7c7c30ece8e587a41307346c5"],["/img/flags/1x1/as.svg","b58d440c6d68fcce46fe5d7ced61309d"],["/img/flags/1x1/at.svg","496dfcfd4da097adfaa2bc8cb9cefc06"],["/img/flags/1x1/au.svg","4e0b5dee8e15cc6e96685041d65d0ec9"],["/img/flags/1x1/aw.svg","e62b3556746db8c21cb095877155b957"],["/img/flags/1x1/ax.svg","46d5c7edd597bb9463b46d01969fad59"],["/img/flags/1x1/az.svg","aa936c7352cd9d1371a16a1001f27b23"],["/img/flags/1x1/ba.svg","1dbc75f224d884a58c16ad6ace8c832a"],["/img/flags/1x1/bb.svg","c53fa8a2c76eac2125beb75de262eb32"],["/img/flags/1x1/bd.svg","7663a5e8c666f370222147b91730bb50"],["/img/flags/1x1/be.svg","c9ed444e602cadbf1b00c4f6c082f1c9"],["/img/flags/1x1/bf.svg","ff90f09377348cc880cab493b3461a9d"],["/img/flags/1x1/bg.svg","2705fa6535e56560dad5214fa8066062"],["/img/flags/1x1/bh.svg","e5ebd259347e6a4707bf58c3f790bb26"],["/img/flags/1x1/bi.svg","721b4485a656b89bf8d91632863c2fd4"],["/img/flags/1x1/bj.svg","289875872842f3bfc88df8cfacae05ba"],["/img/flags/1x1/bl.svg","5c036b34e63e5e3dca17c6bb8a792d43"],["/img/flags/1x1/bm.svg","8ce128b7f6b569c2157b8948cca85d62"],["/img/flags/1x1/bn.svg","3b1adf1fc966cd64adb1aadd8eee707e"],["/img/flags/1x1/bo.svg","8e8fc2a074353f1fc1f48de1dafd3c26"],["/img/flags/1x1/bq.svg","ca6053fe5ab237feb67db97f899093cd"],["/img/flags/1x1/br.svg","912ef12808a00ca23615e026b87ab0ed"],["/img/flags/1x1/bs.svg","6eec61372f7a533a6cf62b039e315821"],["/img/flags/1x1/bt.svg","529fc0aeae55b0e2898edb3398d5d63e"],["/img/flags/1x1/bv.svg","4c0a89a4e1c10d7fd19c925509680f72"],["/img/flags/1x1/bw.svg","b02dc3e6711c34f56e9b2443ccd9aa3b"],["/img/flags/1x1/by.svg","e1a2a88f248d250d580c12bb0426d25b"],["/img/flags/1x1/bz.svg","4f4f6854a1b6fa4ce8e5a71fec6a482d"],["/img/flags/1x1/ca.svg","51e9d0f8fc021dc21741e06665f6166a"],["/img/flags/1x1/cc.svg","dcc5257c1b935f74f1496065f3a52cde"],["/img/flags/1x1/cd.svg","25ef5bb86710d6092db4253f3e98b4bf"],["/img/flags/1x1/cf.svg","37c7b15ebcea8565e9ea0b0e930a72a3"],["/img/flags/1x1/cg.svg","b61b0e18b7610dfadcafb62d67121c8b"],["/img/flags/1x1/ch.svg","0f3600da0186c788e7f36fd9a8369855"],["/img/flags/1x1/ci.svg","db10b96d2aee962779e25693ec0bd8f9"],["/img/flags/1x1/ck.svg","d5571e7d8a37260674c8317e7accb28e"],["/img/flags/1x1/cl.svg","42527104a74f371abea5555a35dce560"],["/img/flags/1x1/cm.svg","6fc9ecb453409bf2486d2449df0ae57f"],["/img/flags/1x1/cn.svg","d9e516e0cfaa4460b4fb5de239293313"],["/img/flags/1x1/co.svg","c8c669a382892e18bbad9f5953786526"],["/img/flags/1x1/cr.svg","14642efdda3420841073e8612421a4a5"],["/img/flags/1x1/cu.svg","1ea046b98278eb7381eb450a3c567ea8"],["/img/flags/1x1/cv.svg","ce263533e5e64d6b72e7b77cbe7706f3"],["/img/flags/1x1/cw.svg","fb4608ef76e3aaef948ca72b25b61dfc"],["/img/flags/1x1/cx.svg","2f8ddcbd994d46a0a3bcefefa05dccb8"],["/img/flags/1x1/cy.svg","5625e37ccfc61a00d033ae44fec19119"],["/img/flags/1x1/cz.svg","7fafc32b9ee3a3c9819cd00e3b5edf62"],["/img/flags/1x1/de.svg","2f0cc91e5d105e0b85191991f57a4345"],["/img/flags/1x1/dj.svg","f5f59bfe458961ba225d2908a5786b95"],["/img/flags/1x1/dk.svg","95d7653a1b39adcdb3b461d5bca9243d"],["/img/flags/1x1/dm.svg","69c1ee14805d1ee40e2b3c58dc04c58f"],["/img/flags/1x1/do.svg","0a03ab71b4dea11deb0f507af39d69c1"],["/img/flags/1x1/dz.svg","443888f8d134996827f91a2dd76f1081"],["/img/flags/1x1/ec.svg","b93bcb13017e9f3bb917c558abf3db36"],["/img/flags/1x1/ee.svg","3d43f0ce90d36a1ecb14a9d0f765429e"],["/img/flags/1x1/eg.svg","012d8848bc50c44f136331bf5d848117"],["/img/flags/1x1/eh.svg","17b06eece1300ff3ae0e3d0b6027185b"],["/img/flags/1x1/er.svg","ced283e3f4fe0df21ccd364d59ba88de"],["/img/flags/1x1/es-ct.svg","c9ebf90e8c160c20d66b4376df29fbd7"],["/img/flags/1x1/es.svg","bcf0e52c0a3509f25bdbc175f7f9472c"],["/img/flags/1x1/et.svg","3f18d2cd2661751e51eecf1d0bb6e267"],["/img/flags/1x1/eu.svg","d6a90ed89da9bc612f7f9b47d3b5fe89"],["/img/flags/1x1/fi.svg","a74012b69325a61f1627c5032619a5aa"],["/img/flags/1x1/fj.svg","ce6648e0dfcc0553a5dbd0434d94fb17"],["/img/flags/1x1/fk.svg","b3e92e5a23216a891e1fb804ce0e5e7f"],["/img/flags/1x1/fm.svg","2eb9360bb104bf12e4f1e7a600f6a461"],["/img/flags/1x1/fo.svg","989ea93a93452ca1cb605bb49276f1b9"],["/img/flags/1x1/fr.svg","5c036b34e63e5e3dca17c6bb8a792d43"],["/img/flags/1x1/ga.svg","f6d2c4c84e735580c44699958b33a284"],["/img/flags/1x1/gb-eng.svg","c8febd281aa32c6ec452dd492910337e"],["/img/flags/1x1/gb-nir.svg","7fe159304aa45a7d0b64b689b2e37ec6"],["/img/flags/1x1/gb-sct.svg","211555b4e7756914170a240bc062a15b"],["/img/flags/1x1/gb-wls.svg","28aebff46af5b3020e7bbfa3d3d3a932"],["/img/flags/1x1/gb.svg","85094acfa71932f6052bb2d3ddca7dd6"],["/img/flags/1x1/gd.svg","6b1c19acc776b34a8c03a7f2ed098258"],["/img/flags/1x1/ge.svg","6c28cfcdfea123804e6ef1296046d7c7"],["/img/flags/1x1/gf.svg","63daae8acfa0904ac75ce267223ae2f3"],["/img/flags/1x1/gg.svg","214b978faf0372e89a945dd1e9470904"],["/img/flags/1x1/gh.svg","a181e0dbc826509891808b4dc34963f1"],["/img/flags/1x1/gi.svg","007f4ccd72469d46c47c71f53fe522f0"],["/img/flags/1x1/gl.svg","a6ea3fff4732df1ebd57d44d1dcc7663"],["/img/flags/1x1/gm.svg","3cb70a4a8dc2fe3b68a12cece97a76e9"],["/img/flags/1x1/gn.svg","bcf9ce5caf1300c2c7dfe6e0340fe741"],["/img/flags/1x1/gp.svg","5c036b34e63e5e3dca17c6bb8a792d43"],["/img/flags/1x1/gq.svg","b5c31b8d436f747e07a31bdc925af9ce"],["/img/flags/1x1/gr.svg","71c651ad26525ef5d166cc0fdf3262d2"],["/img/flags/1x1/gs.svg","80c9ecc96fd43c4dcfc09f937358b54c"],["/img/flags/1x1/gt.svg","3dfc64b1afcf171b30bf8d9d7ba5bae9"],["/img/flags/1x1/gu.svg","72a3d8a76b7075e53289b030efdb42db"],["/img/flags/1x1/gw.svg","8b47acf29acb8c820efdcfa9a58977b0"],["/img/flags/1x1/gy.svg","d5c4d39da04ea329b1d67e61f421f005"],["/img/flags/1x1/hk.svg","ebaba37f15afb4250f41319dee22ee8d"],["/img/flags/1x1/hm.svg","ae6bd77a4ff4e9fb387738e2f7354e85"],["/img/flags/1x1/hn.svg","d8c5a0659157153587178620fe435ca9"],["/img/flags/1x1/hr.svg","af30ee8423efd815f6ff7f05f1ee5ac2"],["/img/flags/1x1/ht.svg","ff925fc989bd3f6cbf6b51039cf48157"],["/img/flags/1x1/hu.svg","67a978cb74f62eb3fd6c68c545fbcab0"],["/img/flags/1x1/id.svg","8230613324f7e176b3e885c1a6c4bd7f"],["/img/flags/1x1/ie.svg","43918453fccd53464a078e842d095118"],["/img/flags/1x1/il.svg","72c2ab08f7acd6c011702d1ff0377371"],["/img/flags/1x1/im.svg","142274ba43a5c77c0011cd90d04478b8"],["/img/flags/1x1/in.svg","0cb8e0482cc29eade80a49b1e9adc7d9"],["/img/flags/1x1/io.svg","bd73513a79a67bbf68940a4e58946635"],["/img/flags/1x1/iq.svg","aedb842834b6214186166c59af1c9fae"],["/img/flags/1x1/ir.svg","67a97ce584c1adcbaceda5e39d5ebedf"],["/img/flags/1x1/is.svg","ed83bf40f37415fa34af2f52cf08c2c0"],["/img/flags/1x1/it.svg","c1188d7acabf4c6e6fdc425d432a7dbc"],["/img/flags/1x1/je.svg","4870e83f36c0b35544b180793f4a776a"],["/img/flags/1x1/jm.svg","5be13c7ac50f8f13d0b76e3188f689e9"],["/img/flags/1x1/jo.svg","64f47106837583df91891b3b0d9ebe7e"],["/img/flags/1x1/jp.svg","0e78a72f4683a761b129ad636134b246"],["/img/flags/1x1/ke.svg","b8c1d3fc33f473f7754956bf83302ba7"],["/img/flags/1x1/kg.svg","06277cb7c5774a72545c906067a49833"],["/img/flags/1x1/kh.svg","cdc2ca75f0996dc28dac75f29db53999"],["/img/flags/1x1/ki.svg","ba11693a62143b39e597cdf8240eb761"],["/img/flags/1x1/km.svg","a6eb638475ee378d287e922a8bd94641"],["/img/flags/1x1/kn.svg","6f8d6e5c182525a39c4d1406e4ded367"],["/img/flags/1x1/kp.svg","0c2642681966f46655800c509dcf67eb"],["/img/flags/1x1/kr.svg","5d175aca14732a67294f4f0864620f38"],["/img/flags/1x1/kw.svg","98ed31b8e6b8c475db163cec52f5ace1"],["/img/flags/1x1/ky.svg","bf5b78348ad022bffa75de393f72fb78"],["/img/flags/1x1/kz.svg","61e5d26f58b12c031c8dc3b4b162f4e7"],["/img/flags/1x1/la.svg","e7f0c38cf8fa0634dfad7d2396a20a96"],["/img/flags/1x1/lb.svg","0b9a6d29f2e73ddcb5953adec91e4244"],["/img/flags/1x1/lc.svg","167054f5c471837c2d786a3211444049"],["/img/flags/1x1/li.svg","48b4539f9c6eb270041d63a5d275729f"],["/img/flags/1x1/lk.svg","8cdb6c4cfde542e80c9a6a6abc020ec7"],["/img/flags/1x1/lr.svg","79143ebb9cac7676da952d3126558da0"],["/img/flags/1x1/ls.svg","41bf832081dd4bb6f44f804446c3f237"],["/img/flags/1x1/lt.svg","b31b1a9d81863caa36363899c8d868a5"],["/img/flags/1x1/lu.svg","0bec8d8207fa7ab778d8aef1bffb304a"],["/img/flags/1x1/lv.svg","e0edd30ddcb307d63a74ea5b49fa0a7e"],["/img/flags/1x1/ly.svg","64ddc73bfca49f67eaa85bb6fbc9d340"],["/img/flags/1x1/ma.svg","912d7ab0636ba45e7997509b601c7fc5"],["/img/flags/1x1/mc.svg","98d255abd53cb5ffbe836dc377d5f159"],["/img/flags/1x1/md.svg","ffc206f2a1ebc1551e306279bc3cd6ba"],["/img/flags/1x1/me.svg","d7845efad9293f6bbb8dac290e92b325"],["/img/flags/1x1/mf.svg","5c036b34e63e5e3dca17c6bb8a792d43"],["/img/flags/1x1/mg.svg","cc59e65fbb8e89e5b7712a2224720667"],["/img/flags/1x1/mh.svg","fdb6b21d5d95cd379c696c37f386abe2"],["/img/flags/1x1/mk.svg","33f06a538a58d4ca984e31c2a95ee7bb"],["/img/flags/1x1/ml.svg","e6fbf0c245782de99a46092b940f28ad"],["/img/flags/1x1/mm.svg","224ef567389a5d78726e2d269ceb77cc"],["/img/flags/1x1/mn.svg","386677113b8449759e64a80daeb1d033"],["/img/flags/1x1/mo.svg","bb326218492e91ba742ce84c15db025b"],["/img/flags/1x1/mp.svg","4f01d49a8152164a57c3125921ecd697"],["/img/flags/1x1/mq.svg","5c036b34e63e5e3dca17c6bb8a792d43"],["/img/flags/1x1/mr.svg","2f63b34f2e5ef8994d534b8586a6be85"],["/img/flags/1x1/ms.svg","465ab310b985221d1d82e7fbd9587ed8"],["/img/flags/1x1/mt.svg","a8286c63a6ca116efa743df2e787fea4"],["/img/flags/1x1/mu.svg","b70e5c5b44d660b3bbc602624926b050"],["/img/flags/1x1/mv.svg","8569fbeba8c16431780300982997a330"],["/img/flags/1x1/mw.svg","26a1ce3210687823d675deefe7eb7d8f"],["/img/flags/1x1/mx.svg","e832bb6e67e893ce8b2bced575d9053f"],["/img/flags/1x1/my.svg","927a02d20aa5b3e626696042d5a842b8"],["/img/flags/1x1/mz.svg","e2352c7ddf3ebc451778141289993eac"],["/img/flags/1x1/na.svg","9e1f9d604f2c22f76b79572520f1f2fb"],["/img/flags/1x1/nc.svg","5c036b34e63e5e3dca17c6bb8a792d43"],["/img/flags/1x1/ne.svg","65a7fb93b2401113ae4e46010906a9ff"],["/img/flags/1x1/nf.svg","18c1e57c76abfbe25a39a523430ba386"],["/img/flags/1x1/ng.svg","b653ae47edc6181db3939a1d005aad95"],["/img/flags/1x1/ni.svg","23ec8b7be5c1f8ea2137d8c4289f11b7"],["/img/flags/1x1/nl.svg","a20cff8926c234938d500148f174477d"],["/img/flags/1x1/no.svg","36405c4e91fad11c039cbb826c0969db"],["/img/flags/1x1/np.svg","a11ce73befbd500875e53830091605fd"],["/img/flags/1x1/nr.svg","99f13e78fa14e411dfa5762b9456a591"],["/img/flags/1x1/nu.svg","5563d29ccdd2a17e1b4181316547900a"],["/img/flags/1x1/nz.svg","48547f8bf60740ac3f7e915bd7d5f692"],["/img/flags/1x1/om.svg","5a22f5e420fb3123436a6e27b71f0367"],["/img/flags/1x1/pa.svg","e04ecce161360d04e37ce8826ecce473"],["/img/flags/1x1/pe.svg","f7a8f425cba3e9cd626bb7e186e84eea"],["/img/flags/1x1/pf.svg","75e1190a6563a10dda2e825e01102e06"],["/img/flags/1x1/pg.svg","128f84ae026e1d6762abad58319103d0"],["/img/flags/1x1/ph.svg","afc6f9bafccbd42c86e236c4fed2ca87"],["/img/flags/1x1/pi.svg","beb78a42003749537ae8ed903275ac7a"],["/img/flags/1x1/pk.svg","2f3bb28109b9d7cc1d7803814b728fb6"],["/img/flags/1x1/pl.svg","ab47fed8df8355569d7b6962ce7cdbd9"],["/img/flags/1x1/pm.svg","5c036b34e63e5e3dca17c6bb8a792d43"],["/img/flags/1x1/pn.svg","8470a7946d0536fe638e2b7b23be36b9"],["/img/flags/1x1/pr.svg","da7f127be9134346a2a72dfae2e1ab2c"],["/img/flags/1x1/ps.svg","73dfae2eeda83953a1105c2b99162b3e"],["/img/flags/1x1/pt.svg","92aa7b479b00780fda6ee227e2403928"],["/img/flags/1x1/pw.svg","3cd64d56601f1e25f2ac7ebb46a15dd1"],["/img/flags/1x1/py.svg","f2d931c5951314327075d3456497ddc4"],["/img/flags/1x1/qa.svg","c45037aaf4bfd04a79f15cc08a9eb214"],["/img/flags/1x1/re.svg","5c036b34e63e5e3dca17c6bb8a792d43"],["/img/flags/1x1/ro.svg","456049d4ba9afa1288152a85c26beeba"],["/img/flags/1x1/rs.svg","28c3a00142eea442887d24592ba844ba"],["/img/flags/1x1/ru.svg","bb606da8892bddd3fdefac61f2c87b9e"],["/img/flags/1x1/rw.svg","6556db07f3b2e85feafaf8b60662cb9a"],["/img/flags/1x1/sa.svg","6ab2635798e94ab75605c3453d2fd717"],["/img/flags/1x1/sb.svg","a6a671510375d11657ea789540fde067"],["/img/flags/1x1/sc.svg","cf0add6d45a66a56221097cfacf0cef2"],["/img/flags/1x1/sd.svg","9dc0805ff6cf6a8d9977358a39b6cfa2"],["/img/flags/1x1/se.svg","06e936c075ebf9599435d02a2464de99"],["/img/flags/1x1/sg.svg","22c3b551d74fa7a0f78adcfe1dd12021"],["/img/flags/1x1/sh.svg","8f2f72e25691c81536f3aa25adea2fbe"],["/img/flags/1x1/si.svg","887d5780afcd2fb9cebdb1fbfb2e84e7"],["/img/flags/1x1/sj.svg","670cac9b6290af913dd9b18993df0f7a"],["/img/flags/1x1/sk.svg","d9ea84cb68b1088fc45eb55744b4b885"],["/img/flags/1x1/sl.svg","f0b9eed6f72a0f64e911e5093c244097"],["/img/flags/1x1/sm.svg","78656a56cac606616881259726f075b8"],["/img/flags/1x1/sn.svg","588bfe5c2e6cc36e81a3d39482cb854b"],["/img/flags/1x1/so.svg","d3bc0bb620460bcf14c21e23c4ddc2a3"],["/img/flags/1x1/sr.svg","6bdabdfd7b1890dd9864e5d459751c88"],["/img/flags/1x1/ss.svg","1b5a91ff65c3822c1b49a37adaf63fe1"],["/img/flags/1x1/st.svg","03b2c2c05d0a2a0273bb9f2d2dcf9389"],["/img/flags/1x1/sv.svg","07082506d09e937d524c0ab7aa4069bb"],["/img/flags/1x1/sx.svg","d24b9325eb1805b0c0f7029ce5f7d1c9"],["/img/flags/1x1/sy.svg","c17fa77022d34d9f5d45b4ad29e2785e"],["/img/flags/1x1/sz.svg","6f4d385a5cb59414c893d7c9cfb72b33"],["/img/flags/1x1/tc.svg","0279af253f687d800fcbc5b94a391e5d"],["/img/flags/1x1/td.svg","1df7f13006f852e2d6d4ff5fe7a409b3"],["/img/flags/1x1/tf.svg","9143493d2fde13e090b05080f183cc52"],["/img/flags/1x1/tg.svg","b132b8840f46f4b06f37486b3a9fecaa"],["/img/flags/1x1/th.svg","d508f2a880f05270426dc157cc0ebc15"],["/img/flags/1x1/tj.svg","7090f77d4516a4980f8d468f0e6a8305"],["/img/flags/1x1/tk.svg","989ed19f5351c9344cc4dda3e9c99b92"],["/img/flags/1x1/tl.svg","8fce4156035ebec4fb84df7e0481af1e"],["/img/flags/1x1/tm.svg","f97af1e38fc70c1c93f1f8a6ba4bb7c3"],["/img/flags/1x1/tn.svg","7e6533e67a542c31cd55de480fd928a8"],["/img/flags/1x1/to.svg","8d367243dbb2d993c163f756b6049cbc"],["/img/flags/1x1/tr.svg","5a7f47235276d496f945e0d027a0f55f"],["/img/flags/1x1/tt.svg","07e6e98bbb57599901953e85681f66e4"],["/img/flags/1x1/tv.svg","3fc46e73bff2c5d3f94d18f75cd36b7c"],["/img/flags/1x1/tw.svg","14a503ce8b4f990c24bf3da0d462d84d"],["/img/flags/1x1/tz.svg","0f5c1d38b5f720cbb1fa33f6b931aa1c"],["/img/flags/1x1/ua.svg","3c63c35900a99af6544b8fc92a9c4816"],["/img/flags/1x1/ug.svg","b072b132a0794897691b9288328478a7"],["/img/flags/1x1/um.svg","b807983acb92c61d4603b5fad71f68dd"],["/img/flags/1x1/un.svg","8fb94e0f08e9dfeeb7c9a506648d85fc"],["/img/flags/1x1/us.svg","410b4dbf27f25f297df0672fa5907f5f"],["/img/flags/1x1/uy.svg","e433941599ab1540b6e88778f1261c11"],["/img/flags/1x1/uz.svg","9543154d50b8dcefb598d0390ce39651"],["/img/flags/1x1/va.svg","bfeb112b59fa6fd586680ee623321854"],["/img/flags/1x1/vc.svg","c9807f43d97ec827c28572ce35aaa3ac"],["/img/flags/1x1/ve.svg","2b84ddbaab27f23f69fdc8a4afac36a0"],["/img/flags/1x1/vg.svg","b23034f98abe6232b38753b80af38d9d"],["/img/flags/1x1/vi.svg","e7489c47dbbcb80669f093039bf8783f"],["/img/flags/1x1/vn.svg","f1bfea8d8d5f5910cd287e49e24621a0"],["/img/flags/1x1/vu.svg","af4a2cdafd319269fcb4451ac26c755a"],["/img/flags/1x1/wf.svg","5c036b34e63e5e3dca17c6bb8a792d43"],["/img/flags/1x1/ws.svg","92fbc6d4444bf443abdadd3cea85896b"],["/img/flags/1x1/xk.svg","76784ccfc67430593732271f34eb8022"],["/img/flags/1x1/ye.svg","e4242dc3485eec02d9819b05f94cab48"],["/img/flags/1x1/yt.svg","5c036b34e63e5e3dca17c6bb8a792d43"],["/img/flags/1x1/za.svg","e448d122dfb69575e2e7fb0d5cbd4ba7"],["/img/flags/1x1/zm.svg","719984b1fe435488cc926daa91905bbb"],["/img/flags/1x1/zw.svg","e6759f49d72a57216baecb8fd3846ea1"],["/img/flags/4x3/ad.svg","b940de9872437f9c6f10940b1381a92d"],["/img/flags/4x3/ae.svg","6ab1227cbf8295d20ed9fc79f19f955b"],["/img/flags/4x3/af.svg","6abc43d289bc0dd2f289dbfef1dd6b73"],["/img/flags/4x3/ag.svg","c5f7f8f4a90d0952d63f4adf4caeb4ce"],["/img/flags/4x3/ai.svg","116bce758654c2450232d926fb46395d"],["/img/flags/4x3/al.svg","f8e50a1ae706df3c1e016d4d132064b4"],["/img/flags/4x3/am.svg","cd00900a48f25664324120ccff3c1387"],["/img/flags/4x3/ao.svg","bfa881bc6c3a70ceecd67bc4d747ae40"],["/img/flags/4x3/aq.svg","15927efd42c551fba43640133087d3f3"],["/img/flags/4x3/ar.svg","76d747ea465acbcda70d8aaf6d042fa6"],["/img/flags/4x3/as.svg","26d9734e85653c83268543e1e643c03d"],["/img/flags/4x3/at.svg","47d98a5e4e03751cc540b569d8571b67"],["/img/flags/4x3/au.svg","729fbfe0a776803ae2179e1a7dbfaa58"],["/img/flags/4x3/aw.svg","6fc6818a6762cc0f9c0468991c531425"],["/img/flags/4x3/ax.svg","e13c5617b83897aa6976e1bb438d0888"],["/img/flags/4x3/az.svg","151eef868a6a7036a937a376ed218a46"],["/img/flags/4x3/ba.svg","f7122adbdab3f82657e9d539c03accfa"],["/img/flags/4x3/bb.svg","4e395ce269d08b978f4c60e182862e1c"],["/img/flags/4x3/bd.svg","7f0542aeacf8930f23f67ee4e4ee2973"],["/img/flags/4x3/be.svg","a5b1f43a72b6926cc0ae627a078b686d"],["/img/flags/4x3/bf.svg","4cd99fda8e1cf3e2fc54a68bd4a10e5c"],["/img/flags/4x3/bg.svg","5dc6bf4982ccd01ad0d0210cb7ea7dbb"],["/img/flags/4x3/bh.svg","d7e361d9c93d9c7a981dfa6853de49aa"],["/img/flags/4x3/bi.svg","848a6c427e150f6ab8ea4a04545c3c52"],["/img/flags/4x3/bj.svg","3754e8b6a7d419139099da825d43cf10"],["/img/flags/4x3/bl.svg","7e5e15fbf972a23945906337e86c6c28"],["/img/flags/4x3/bm.svg","66bd8e808a023f39143728300543af78"],["/img/flags/4x3/bn.svg","bc085d7399e13438b05cac9348ac85e2"],["/img/flags/4x3/bo.svg","c0d53d344c597c248cde9e7d3299b721"],["/img/flags/4x3/bq.svg","caec7df85906eb333b4beef973037364"],["/img/flags/4x3/br.svg","e65d3bd397688d6f66bd8fbee7eaf74a"],["/img/flags/4x3/bs.svg","a523dd3c427153d4c64f377c2c61c26a"],["/img/flags/4x3/bt.svg","1bf3d854b27f0c3da8912a2c52bc28bc"],["/img/flags/4x3/bv.svg","57f02cfac50e26c9b00cc7a3209d6219"],["/img/flags/4x3/bw.svg","4268276c0949609c28e3a5b4772531d7"],["/img/flags/4x3/by.svg","6654c75b61fd282ea56d9948bf36be35"],["/img/flags/4x3/bz.svg","433d5a3e6b52620e15dd5ca694dd7e9b"],["/img/flags/4x3/ca.svg","0653bb3ece99e35bca1eaecac0f989bc"],["/img/flags/4x3/cc.svg","faef487b62201705e1294793c61957ae"],["/img/flags/4x3/cd.svg","47aec89f217a49ebaf0a8a4bf262cb7e"],["/img/flags/4x3/cf.svg","779dd2641a5ac3dd9620ca65ff9f7618"],["/img/flags/4x3/cg.svg","f485dabc61aa5ed191a59abb2f5e9d1d"],["/img/flags/4x3/ch.svg","faa59b27f672a347e9087151b07cf68c"],["/img/flags/4x3/ci.svg","05e8ff32d86f6683eab575f8b420efeb"],["/img/flags/4x3/ck.svg","7a73dc7d43cb24ce57e4f3e6a96a5c70"],["/img/flags/4x3/cl.svg","c0706f3ca643f9805b9de70165ee48d1"],["/img/flags/4x3/cm.svg","93b55263fd48dfff89e6f610ab12f0a2"],["/img/flags/4x3/cn.svg","afa55647992321252aae8dbbdb1ae48c"],["/img/flags/4x3/co.svg","bf3bdd49999efe61abf524d5ed068337"],["/img/flags/4x3/cr.svg","50baa8f17646788de1e2f26326c9d00e"],["/img/flags/4x3/cu.svg","ef357d974ff61c3ad54707a69e46310e"],["/img/flags/4x3/cv.svg","82965eb27d97a385f656a03c60f09159"],["/img/flags/4x3/cw.svg","1a1cfe55a35792079e846b68e7955254"],["/img/flags/4x3/cx.svg","041d007bc46b36c2981a4606cd80efda"],["/img/flags/4x3/cy.svg","b25dd09e8ea70e410415f0bcebdc78a4"],["/img/flags/4x3/cz.svg","198a904fbddf0d39a0ebdfca18a4e5b6"],["/img/flags/4x3/de.svg","52f420da94ae60f6dcf173d224e365d8"],["/img/flags/4x3/dj.svg","ee550dad7a5611067db19e629ee12156"],["/img/flags/4x3/dk.svg","6c007494b43b9fd94b1c5bf1639e43a9"],["/img/flags/4x3/dm.svg","cb4127309ddab3d06abed6acdea11a68"],["/img/flags/4x3/do.svg","bf385c000eaaa5b41a75def9107da4a2"],["/img/flags/4x3/dz.svg","ad89831803dcdef9b9ddc1a19591f514"],["/img/flags/4x3/ec.svg","ef033cba771949559a4afc1f1aef091f"],["/img/flags/4x3/ee.svg","6135b11d01f9e90786de60e8641c5276"],["/img/flags/4x3/eg.svg","347e6b03972a53abd2f10f4963fea569"],["/img/flags/4x3/eh.svg","999f172cd8a369bfa21a526bb3059e6b"],["/img/flags/4x3/er.svg","6eb9a20b2808c64cd978b2caae550d66"],["/img/flags/4x3/es-ct.svg","7e150c011a2a54e79cc37e4168333b42"],["/img/flags/4x3/es.svg","f0611b99717f9dca3a4d6ba00b0be9a7"],["/img/flags/4x3/et.svg","d696c04ae96b70037f803d42fae9ba8f"],["/img/flags/4x3/eu.svg","785ed29863c475de936ee22ecae186b4"],["/img/flags/4x3/fi.svg","150036922d64730cfb8c09ac0ebffe30"],["/img/flags/4x3/fj.svg","187e73d96f91bc51ff6b3f55646c1b8d"],["/img/flags/4x3/fk.svg","914fc3511d4a3067876badc783cc4172"],["/img/flags/4x3/fm.svg","dac3f025d195498448ed8c7eb08a128e"],["/img/flags/4x3/fo.svg","d5b88d5d4925a1c8b90b11a115774339"],["/img/flags/4x3/fr.svg","7e5e15fbf972a23945906337e86c6c28"],["/img/flags/4x3/ga.svg","b1638d55a2bf23acde00cf21b1162428"],["/img/flags/4x3/gb-eng.svg","d42077ca50194a3d9f772414752d882f"],["/img/flags/4x3/gb-nir.svg","d45a37f4f441e57a9011997e85bb42e8"],["/img/flags/4x3/gb-sct.svg","57921ed2a9d5dfa5401a5902597b1abc"],["/img/flags/4x3/gb-wls.svg","842f7c877edc1f1a05eeea9677de2bed"],["/img/flags/4x3/gb.svg","b9c954a867bfad1f950281bb7485ddb6"],["/img/flags/4x3/gd.svg","f1ac468df3e1ada6eeeaaf0fe40d5018"],["/img/flags/4x3/ge.svg","95910e6a6566e703fd4bb77651d77f85"],["/img/flags/4x3/gf.svg","2269e43efa067223e8b8e362af58a412"],["/img/flags/4x3/gg.svg","a533d9ea9ea3a89c0dd9b9213b281e78"],["/img/flags/4x3/gh.svg","c538ba3e7d06703fc5832cc1b3ab7b90"],["/img/flags/4x3/gi.svg","1c3df102ef2e86e466c39814504e70e5"],["/img/flags/4x3/gl.svg","05eb77f4a6a36ac4c8bcb15e1d92a801"],["/img/flags/4x3/gm.svg","86ce96e9cdffc82ea859cae884f6db49"],["/img/flags/4x3/gn.svg","334613832476d164009b8482a7561eac"],["/img/flags/4x3/gp.svg","7e5e15fbf972a23945906337e86c6c28"],["/img/flags/4x3/gq.svg","1918a41eecd0bbc5c879690107747e27"],["/img/flags/4x3/gr.svg","f198b25cf40c473ae23af14727c6dd2e"],["/img/flags/4x3/gs.svg","ae1f146b0bc4e7755451d97bb0f71637"],["/img/flags/4x3/gt.svg","ab0417823f69b9ae5828491e0e7fb918"],["/img/flags/4x3/gu.svg","1fa3f4328baa43a6c3fbc40eddff351f"],["/img/flags/4x3/gw.svg","9f9fb0944945b347e41abc142a5623ac"],["/img/flags/4x3/gy.svg","2b07feaedb7ee116e2339f375f350b35"],["/img/flags/4x3/hk.svg","a63e23787f2e3a2d62fd63b8f32d0b01"],["/img/flags/4x3/hm.svg","7f92cc20fb9efead53675c4ee9e0ae9f"],["/img/flags/4x3/hn.svg","7a5623851a8d4da7f102c9f863cff4c1"],["/img/flags/4x3/hr.svg","e5d6412d49a134e767add222c9176c72"],["/img/flags/4x3/ht.svg","1c21bfdec808a4c46bfee4d59138f6bf"],["/img/flags/4x3/hu.svg","44bb640d57ed03c244c60b8f34b179fd"],["/img/flags/4x3/id.svg","1cec7bdaf6d3c890c145015fa3833da9"],["/img/flags/4x3/ie.svg","00a56e4c0144c3250351c3b0bbf0f3d9"],["/img/flags/4x3/il.svg","afd1969e9c33c433b865ab43ac226669"],["/img/flags/4x3/im.svg","540840ada0149392fd119e4116f5c083"],["/img/flags/4x3/in.svg","8c7d536fc88082e979273e72c5495bac"],["/img/flags/4x3/io.svg","4cd4d1aff0ae2d56c47a991c76246b1f"],["/img/flags/4x3/iq.svg","136ba5c7a49c3bf235f3e5070d2ba082"],["/img/flags/4x3/ir.svg","790efa4ad1432b2fd13ca1eecabc083d"],["/img/flags/4x3/is.svg","c01434d23501b914977d5ed6c103a685"],["/img/flags/4x3/it.svg","09c30a90b5dfc3bb816f4ab4d1627c30"],["/img/flags/4x3/je.svg","8fdb25c56bb492fc1f1dc438a6eeb78f"],["/img/flags/4x3/jm.svg","e5fbda09e24d04a4dff593f8421ecf1f"],["/img/flags/4x3/jo.svg","d60b5b5b67ef77fd35751a46869d40cb"],["/img/flags/4x3/jp.svg","bd579b683c0e7352ede92ae6885f1098"],["/img/flags/4x3/ke.svg","ca964b0e81ec973292d6ec49696e0ee4"],["/img/flags/4x3/kg.svg","bcffe21ed2b58341eeb5f2a1cdda2e6a"],["/img/flags/4x3/kh.svg","db30b90c7da994fc922e4a6f253c4198"],["/img/flags/4x3/ki.svg","2546fc407fde7ed7d3797de1fd77d2c0"],["/img/flags/4x3/km.svg","a0bf3414b593d16c492dbc823810589b"],["/img/flags/4x3/kn.svg","da8a45774c8318f25e121ddcb129b316"],["/img/flags/4x3/kp.svg","aa0edc05ce92171d9441857404ff0682"],["/img/flags/4x3/kr.svg","971df6e0801118e368e3c5135d4e8f87"],["/img/flags/4x3/kw.svg","8a3715610da1b61ed9abdfd185ee82ad"],["/img/flags/4x3/ky.svg","8bd6c530f71439efd8483507652f5314"],["/img/flags/4x3/kz.svg","b81602b504840f094a94fa30ebfbde86"],["/img/flags/4x3/la.svg","e269eef2f96bd6a416dc4d6540cc7a54"],["/img/flags/4x3/lb.svg","a5c08f7ddaba74e662aedddfcf637378"],["/img/flags/4x3/lc.svg","184e916edeab22407382c18745f80308"],["/img/flags/4x3/li.svg","c06ec74f4d52d4743f5187a957170227"],["/img/flags/4x3/lk.svg","3be35822641288efe16e111a1e4e4908"],["/img/flags/4x3/lr.svg","732a8950a26a96e3142a50df8508ad35"],["/img/flags/4x3/ls.svg","5f21d12d37421277a57d73f0a2f267b4"],["/img/flags/4x3/lt.svg","791db0a7e458c49d7ccff69b044f6d60"],["/img/flags/4x3/lu.svg","1de1678264959ecfa469415b878a6c41"],["/img/flags/4x3/lv.svg","a0eae2fbebfbd426b2fd3ea147d4f1e0"],["/img/flags/4x3/ly.svg","b8185a1f4c96a925575c39361164f298"],["/img/flags/4x3/ma.svg","ea0175664eb783bbe65c013b7ce45648"],["/img/flags/4x3/mc.svg","c66897cadfe0702d19f4f8597850a278"],["/img/flags/4x3/md.svg","5858cdc592de2290a5e51f452b40ecf1"],["/img/flags/4x3/me.svg","1a99ffac0440a9e67b5a33c2d34e9a0b"],["/img/flags/4x3/mf.svg","7e5e15fbf972a23945906337e86c6c28"],["/img/flags/4x3/mg.svg","d4b6837506c181e2ba05da7483692eb1"],["/img/flags/4x3/mh.svg","b9042ba15b17437f25c53aad0c938e7c"],["/img/flags/4x3/mk.svg","2b98cc7480e95de865406a5156da5f47"],["/img/flags/4x3/ml.svg","793acfabcb3dfdfd0dc1df81c4b08c15"],["/img/flags/4x3/mm.svg","cbbda857e1e7cc8416f59f9b928c00e9"],["/img/flags/4x3/mn.svg","481e43858c861b0d2334df762061038e"],["/img/flags/4x3/mo.svg","d62988474d89d0cd8b1c236b53543d8c"],["/img/flags/4x3/mp.svg","0665925927a6d7bf4a432616255a4cda"],["/img/flags/4x3/mq.svg","7e5e15fbf972a23945906337e86c6c28"],["/img/flags/4x3/mr.svg","a5a1885f780fbf9ca47c1707d26a3619"],["/img/flags/4x3/ms.svg","0cb17edd55f06f867376ae6440ea3f61"],["/img/flags/4x3/mt.svg","eb4857203293b45656bd985e24ae787c"],["/img/flags/4x3/mu.svg","623645d1b2d6e845d980584d24b3ea13"],["/img/flags/4x3/mv.svg","9ac00149799c5bfd8cd0b8f90154b1a9"],["/img/flags/4x3/mw.svg","5e3ed25ca9b400ca5cb174dd2eb2a61f"],["/img/flags/4x3/mx.svg","745a8c77111b2246095cebb5a821e250"],["/img/flags/4x3/my.svg","afb7856db929daa8b07895d91ded88a9"],["/img/flags/4x3/mz.svg","9969aaee71e84d84333fd0d88fcdd21b"],["/img/flags/4x3/na.svg","6dbd520a59fd43218e6f30b85839371e"],["/img/flags/4x3/nc.svg","7e5e15fbf972a23945906337e86c6c28"],["/img/flags/4x3/ne.svg","df8df5bafe0cff382f6f0a41c2fdd0f4"],["/img/flags/4x3/nf.svg","1d24e67a7718fdbde05073a6ea7ffc40"],["/img/flags/4x3/ng.svg","2ab032ca834d9720d5277d293d45c672"],["/img/flags/4x3/ni.svg","b8cca4b5409261c08d4f71bd96295918"],["/img/flags/4x3/nl.svg","de08f66c1f3e5aa41fe5ed27b62ce70f"],["/img/flags/4x3/no.svg","1a13241ff36624806ea8df3264caa66e"],["/img/flags/4x3/np.svg","8aa0dab8f7172faaa7e1c3d062fd55ad"],["/img/flags/4x3/nr.svg","40eac1cbea7185e1685509ce497ba39a"],["/img/flags/4x3/nu.svg","005a5c51ce74dabdaa72fbce70eeafff"],["/img/flags/4x3/nz.svg","b644b020661debd29c094f8ed6b5ad3d"],["/img/flags/4x3/om.svg","7fe6019a00411d0559f9cdd603947720"],["/img/flags/4x3/pa.svg","b089baf328053c09b5203b394d30494c"],["/img/flags/4x3/pe.svg","5623a9eb367c8819dc429e87a5705d74"],["/img/flags/4x3/pf.svg","e0cd0ca79be242131625fb1a450f5b90"],["/img/flags/4x3/pg.svg","1168850b2023b7859f615cc95022aa53"],["/img/flags/4x3/ph.svg","fcd906eb82be44950055ce6d5068b1f5"],["/img/flags/4x3/pi.svg","8a36864ea694c07997a733ec8574693d"],["/img/flags/4x3/pk.svg","93c01197592b243cce311a2748286b8a"],["/img/flags/4x3/pl.svg","5dd7c2afb3f4d2ca36b1dfb06fb2b2c9"],["/img/flags/4x3/pm.svg","7e5e15fbf972a23945906337e86c6c28"],["/img/flags/4x3/pn.svg","6fba00617b4620e53c3b81120076c37b"],["/img/flags/4x3/pr.svg","e889a9fc7807e394927831566a9b67dd"],["/img/flags/4x3/ps.svg","db18c24e0ff7f267fdf81b5cc84bd8e3"],["/img/flags/4x3/pt.svg","b68e45b78d9c25a741a51840c1471c6b"],["/img/flags/4x3/pw.svg","01f2b6b0d4c8c4f4e4aa94a976208e5a"],["/img/flags/4x3/py.svg","65506db8f543d545aa7e3af40a3c662d"],["/img/flags/4x3/qa.svg","431553661eeb6300836e6e01781b03b7"],["/img/flags/4x3/re.svg","7e5e15fbf972a23945906337e86c6c28"],["/img/flags/4x3/ro.svg","7629c5671ce0c9d13686f8a5b8b07f94"],["/img/flags/4x3/rs.svg","92565a966a6d815ecd83be5de1bdeda5"],["/img/flags/4x3/ru.svg","3b8be0fedb56b8e53e445c08c946ed0d"],["/img/flags/4x3/rw.svg","2c75117930ed42080b4671f51377fcf1"],["/img/flags/4x3/sa.svg","1a161cccd79dc0f73dc4f79f69d1472a"],["/img/flags/4x3/sb.svg","c9cc5d9ed437b96b857740a4c979ab80"],["/img/flags/4x3/sc.svg","9a6cf97bb45f084f176af229eb16ddf3"],["/img/flags/4x3/sd.svg","f2306d783a4930179498fb36fb78766c"],["/img/flags/4x3/se.svg","07d0d3916ddedfd5b9bac2e7eb662316"],["/img/flags/4x3/sg.svg","95c90433d9512ffb2fb1154b048defd1"],["/img/flags/4x3/sh.svg","df7635e56504ef1c5a8b18a8fd4b3c23"],["/img/flags/4x3/si.svg","1f51bd8201a9ba8c879d6b93acd45780"],["/img/flags/4x3/sj.svg","c8c51920fb31b60e13bee954aaf29242"],["/img/flags/4x3/sk.svg","fccd89733a9d84b63f37a0c2fc929650"],["/img/flags/4x3/sl.svg","a349044894da800e10d5304d168533ed"],["/img/flags/4x3/sm.svg","2fd99608fd68b92672c33d2095b39843"],["/img/flags/4x3/sn.svg","8bb5e875d47033446e9bd9d172f3ce6b"],["/img/flags/4x3/so.svg","7198d571a9f29f3444a3c70d6e50ae34"],["/img/flags/4x3/sr.svg","04c3bf1bde854407f41439a71e49c989"],["/img/flags/4x3/ss.svg","8b362916b35eded5f9bcf51bf9d167ad"],["/img/flags/4x3/st.svg","13c80d05cf5e0f13231af2bdfe7b4c19"],["/img/flags/4x3/sv.svg","f7fe239e8e33fd1825bece3fddca3353"],["/img/flags/4x3/sx.svg","961615b0ecee826b4612d1e6a6d8dda5"],["/img/flags/4x3/sy.svg","215ab06fc3158ad9fce4f8c4b0066ef7"],["/img/flags/4x3/sz.svg","fefd3462f75ca5fe3b87df98782be774"],["/img/flags/4x3/tc.svg","e14f31c8d53bc71d384c689e8aea550c"],["/img/flags/4x3/td.svg","b36fa5c6f8a17953ebc4cee7630fb321"],["/img/flags/4x3/tf.svg","24c2e644ab926b31b2c51841eb126b73"],["/img/flags/4x3/tg.svg","96f28bfab1c2f2dc0995191369a2d39b"],["/img/flags/4x3/th.svg","88f2c5155a03112304cc158fc81b0b03"],["/img/flags/4x3/tj.svg","6c261b35cbf4566b56a52c373ce5b5ea"],["/img/flags/4x3/tk.svg","3eeb1f0627f645679f612cdbea2b7fe3"],["/img/flags/4x3/tl.svg","69abda20155693129e5cf3c24886df3f"],["/img/flags/4x3/tm.svg","95920dfb21ac79100d19ed3602a4b093"],["/img/flags/4x3/tn.svg","2b61ff71b2e28db27fe6d0d5b312bc81"],["/img/flags/4x3/to.svg","a157a7aa52738d42a0de39f9cc7d6ce5"],["/img/flags/4x3/tr.svg","8f73fb242fabd38bb7dbb610d4e44e0d"],["/img/flags/4x3/tt.svg","61fe2aeb1819ffd85fe8d9c9c517df46"],["/img/flags/4x3/tv.svg","49712d1d40f404075868b186a994e0a8"],["/img/flags/4x3/tw.svg","c52e766acd63383b1912b071c04feae2"],["/img/flags/4x3/tz.svg","cf94f77e1f80ff2c5e92e5a561b4a5f6"],["/img/flags/4x3/ua.svg","48a8c1c77eff09606285873a7cedb876"],["/img/flags/4x3/ug.svg","f405035d47613296f5dbde3aa1e75c45"],["/img/flags/4x3/um.svg","59f5391cd6e1781fd4c0a6c3d4271dad"],["/img/flags/4x3/un.svg","fe480e7e7ae550b89f9e3d235c587881"],["/img/flags/4x3/us.svg","7615ffb322d9e00394ea4961052c56c7"],["/img/flags/4x3/uy.svg","90cc10aaf5327a5d3ff2b4eef4be0178"],["/img/flags/4x3/uz.svg","fca6a4db4b48c3f76d08786d262fe1cc"],["/img/flags/4x3/va.svg","0e67762b9390b3d6cc7723e13adaec79"],["/img/flags/4x3/vc.svg","4488dbcee28d2f12fc452d40fd0f23a6"],["/img/flags/4x3/ve.svg","bdd9de48b593f8f3a32393fecbee0698"],["/img/flags/4x3/vg.svg","9916422f80ce888ccd77b9dbec2d7fde"],["/img/flags/4x3/vi.svg","f1dcd5d6c759ce0169cfa9c5e466f0e0"],["/img/flags/4x3/vn.svg","722884c924b26efc9df4805bc2a54aa1"],["/img/flags/4x3/vu.svg","4ecdef475edf4000eb727ea2833352cd"],["/img/flags/4x3/wf.svg","7e5e15fbf972a23945906337e86c6c28"],["/img/flags/4x3/ws.svg","eb5140ca317c79c23c57772316611b21"],["/img/flags/4x3/xk.svg","d2c919a5ad9ea8297be937c61bc5d9dc"],["/img/flags/4x3/ye.svg","851c2a2750d65da2e2431dc22465d2d0"],["/img/flags/4x3/yt.svg","7e5e15fbf972a23945906337e86c6c28"],["/img/flags/4x3/za.svg","4adb32285a9b25c43451aa8b39d0b5b6"],["/img/flags/4x3/zm.svg","cfa4bf9eaa9aca42a2353a43da8c7cb8"],["/img/flags/4x3/zw.svg","afdcce05212470bb928a95f6bdd2a6ce"],["/img/icon.png","e5f222f5224950d8bd87d631aa871018"],["/img/kube.png","74ab52a29e1f86d924a14ff8c39bc74d"],["/img/pixel.svg","ae5b054991873482c1d8b58c3959f8ee"],["/img/pixel2.svg","0887ee16fa549b0175a5bff9919c1ca8"],["/index.html","73d4a8e97d9e547085da41633cf49193"],["/js/index.js","cb31ebbe5e41eaf37bacd10f15827483"],["/posts.html","136ca875f60c58a7d0adab4b4259970c"],["/pr/blog.html","c8168cdc281814c21302e53e7baffc18"],["/pr/index.html","f79dd1a37383f1d576d84d6e054d4b14"],["/pr/posts.html","6d1c152f2da1b61ba89ee1536159b93d"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







