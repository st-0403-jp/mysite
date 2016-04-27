#README

##ターゲット
_Friends or a person I know_
Client（Web site, App, ...）
Engineer

##テーマ
名刺の延長線
情報の発信

##要素
* 名前
* 写真
* 経歴
* 著者
* 使用ツール
* アウトプット
* ワークス
* ブログ  * フロントエンド  * 音楽  * ラーメン（食べ物）  * 車
* メモ : 名前いらない、ちょっとした経歴・説明、git、google+、テーマ

##要件
*情報がある感
*遊び心
*統一感

##サイトマップ
###構成
    index: {
            background,
            wrap-box: {
                        header: helloworld,
                        h1: name,
                        article: {
                                profile,
                                blog(facebook, twitter),
                                output,
                                use package,
                              },
                        aside: {
                            renewal,
                        }
                        footer: {
                                  autorList(photo, image),
                                  connect,
                                  copyrights
                                }
                      }
           }

###共通項目
*header
*footer

##-----base-style-----
font-family
    @import url(https://fonts.googleapis.com/css?family=Poiret+One)
    'Poiret One', 'Meiryo', 'メイリオ', sans-serif

base-color
    #222 //ほぼ黒
    #c0c0c0 //シルバー
    #ff69B4 //ホットピンク

    rgba(255, 255, 255, 0.3); //背景
    rgba(0, 0, 0, 0.7); //背景

    box-shadow: 1px 1px 3px 1px #ff69B4; //ピンク
