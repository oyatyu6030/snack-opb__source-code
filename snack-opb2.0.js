

                                ///////////////////////////////////////////////////////////
                                ///////////////////////////////////////////////////////////
                                ///                                                     ///
                                ///    ////////////    ////////////    //               ///
                                ///    //        //    //        //    //               ///
                                ///    //        //    //        //    //               ///
                                ///    //        //    //        //    //               ///
                                ///    ////////////    ////////////    ////////////     ///
                                ///                    //              //        //     ///
                                ///                    //              //        //     ///
                                ///                    //              //        //     ///
                                ///                    //              ////////////     ///
                                ///                                                     ///
           /////////////////////////////////////////////////////////////////////////////////////////////////////
           /////////////////////////////////////////////////////////////////////////////////////////////////////
           ///                                                                                               ///
           ///      ////////////      ////////        ///////////           ///////////      //       //     ///
           ///     //                //      //      //         //         //          //    //     //       ///
           ///     //               //        //    //           //       //                 //   //         ///
           ///      ////////////    //        //    //           //       //                 //////          ///
           ///                 //   //        //    //           ///      //                 //    //        ///
           ///                 //   //        //     //         // //      //          //    //      //      ///
           ///     /////////////    //        //      ///////////   //      ///////////      //        //    ///
           ///                                                                                               ///
           /////////////////////////////////////////////////////////////////////////////////////////////////////
           /////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//「初期変数定義」////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                              ///
const eris = require('eris')   //erisを呼び出す変数をerisにする。                                                               ///
const bot = new eris('')   //eirsでBOTを呼び出す変数をbotにする。    ///
const fs = require('fs')   //ファイルを呼び出す変数をfsにする。                                                                 ///
                                                                                                                             ///
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//「見える化するところ」/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                                ///    
bot.on('ready', () => {   //BOTの準備ができているなら、                                                                           ///
    console.log('成功しました！')   //ログ表示                                                                                   ///
    bot.editStatus('online', {name: 's! helpでヘルプを表示します。'})   //オンラインならプレイ中ゲームのところにメッセージを表示。    /// 
})   //終了コード                                                                                                               ///    
                                                                                                                               ///   
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function isExistFile(file) {   //fileがあるのかどうなのか確認する関数
    try {
      fs.statSync(file);
      return true
    } catch(err) {
      if(err.code === 'ENOENT') return false
    }
}


function isReadFile(file) {   //fileを読み込む。
    var content = new String();
    try {
        content = fs.readFileSync(file, 'utf8');
        return content
    } catch(err) {
      if(err.code === 'ENOENT') return false
    }
}


function isWriteFile(file, str) {  //fileを書き込む関数。(上書き)
    try {
      fs.writeFileSync(file, str);
      return true
    } catch(err) {
        if(err.code === 'ENOENT') return false
    }
}

function isAppFile(file, str) {  //fileを書き込む関数。(追記)
    try {
        fs.appendFileSync(file, str, 'utf-8');
        return true
    } catch(err) {
        if(err.code === 'ENOENT') return false
    }
}


function isDeleteFile(file) {   //fileがあったら削除する関数
    try {
      fs.unlinkSync(file);
      return true
    } catch(err) {
      if(err.code === 'ENOENT') return false
    }
}


fs.readdir('.', function isAllRead(err, files){
    if (err) throw err;
    var fileList = files.filter(function(file){
        return fs.statSync(file).isFile() && /.*\.json$/.test(file); //絞り込み
    })
    console.log(fileList);
});


function randomInt(max,min = 0) {   //ランダム乱数
    return Math.floor(Math.random() * Math.floor(max + 1 - min)) + min;
}




bot.on('messageCreate', (msg, guild) => {   //文字を作る
    var mai = msg.author.id

    function bc(txt, cha) {
        bot.createMessage(cha, txt);
    }
    
    function isbc(txt) {
        bot.createMessage(msg.channel.id, txt);
    }

    if(msg.content == 's! C:userdata') {   //データ登録
        if(isExistFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json') === true) {
            bot.createMessage(msg.channel.id, {
                embed: {
                    author: {
                        name:　'[登録済み]',
                    },
                    description: 'あなたは既に登録が完了しています。\nデータを削除したい場合は、[s! D:userdata]ですることができます。', 
                    color: 0xff3838,
                    timestamp: new Date(),
                }
            })
        }
        else {
            isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json', 'coin:100', 'utf-8')
            isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_luck/' + mai + '_luck.json', 'luck:0', 'utf-8')
            bot.createMessage(msg.channel.id, {
                embed: {
                    author: {
                        name:　'[登録完了]',
                    },
                    description: '登録が完了しました。\n登録特典として100コインをプレゼントします！', 
                    color: 0x5bb8ff,
                    timestamp: new Date(),
                }
            })
        }
    }
    if(msg.content == 's! D:userdata') {   //データ削除
        if(isExistFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json') === false) {
            bot.createMessage(msg.channel.id, {
                embed: {
                    author: {
                        name:　'[データ未登録]',
                    },
                    description: 'あなたはまだユーザー登録をしていないので削除することができません。\n[s! C:userdata]でまず登録を済ませてください。', 
                    color: 0xff3838,
                    timestamp: new Date(),
                }
            })
        }
        else {
            isDeleteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json')
            isDeleteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_luck/' + mai + '_luck.json')
            bot.createMessage(msg.channel.id, {
                embed: {
                    author: {
                        name:　'[削除完了]',
                    },
                    description: 'あなたのデータを削除しました。\n再登録は[s! C:userdata]でしてください。', 
                    color: 0xffbb00,
                    timestamp: new Date(),
                }
            })
        }
    }
    if(msg.content.match(/s! /)) {
        if(isExistFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json') === false) {
        }
        else {
            var cot = isReadFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json')
            var cot2 = parseInt(cot.replace('coin:', ''))
            var num = parseInt(1)
            var cot3 = cot2 + num
            isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json', 'coin:' + cot3)
        }
        
    }
    if(msg.content == 's! coin') {
        if(isExistFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json') === false) {
            bot.createMessage(msg.channel.id, {
                embed: {
                    author: {
                        name:　'[データ未登録]',
                    },
                    description: 'あなたはまだユーザー登録をしていないので枚数を表示することができません。\n[s! C:userdata]でまず登録を済ませてください。', 
                    color: 0xff3838,
                    timestamp: new Date(),
                }
            })
        }
        else {
            var cot = isReadFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json')
            var cot2 = cot.replace('coin:', '')
            bot.createMessage(msg.channel.id, {
                embed: {
                    author: {
                        name:　'[コイン所持枚数]',
                    },
                    description: '現在のコインは' + cot2 + '枚です。', 
                    color: 0xffdb0f,
                    timestamp: new Date(),
                }
            })
        }
    }
    if(msg.content.match(/s! mg /)) {
        var cot = isReadFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json')
        var cot2 = cot.replace('coin:', '')
        if(isExistFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json') === false) {
            bot.createMessage(msg.channel.id, {
                embed: {
                    author: {
                        name:　'[データ未登録]',
                    },
                    description: 'あなたはまだユーザー登録をしていないのでゲームをすることができません。\n[s! C:userdata]でまず登録を済ませてください。', 
                    color: 0xff3838,
                    timestamp: new Date(),
                }
            })
        }
        else if(cot2 <= 3){
            bot.createMessage(msg.channel.id, {
                embed: {
                    author: {
                        name:　'[コイン不足]',
                    },
                    description: 'コインの枚数が足りません。\nMGには最低3コイン必要なので[s! a]などの[s! ]が付いた文字列を打ってコインを貯めてください。(現在の所持枚数' + cot2 + '枚)', 
                    color: 0xffdb0f,
                    timestamp: new Date(),
                }
            })
        }
        else {
            var num = parseInt(3)
            var cot3 = parseInt(cot2)
            var con = msg.content.replace('s! mg ', '')
            var num2 = ':'
            var num3 = con.indexOf(num2)
            var num4 = parseInt(con.substring(0, num3))
            var num5 = parseInt(con.slice(num3 + 1))
            var ran = randomInt(num4,1);
            var cot4 = cot3 - num5
            var num6 = (num4 * 1)
            var num7 = num6 * num5
            var num8 = num7 + cot4
            var cot5 = num5 - cot3
            var jack = isReadFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_jackpot/jackpot.json')
            var jacks = jack.replace('jackpot:', '')
            var jackes = parseInt(jacks)
            var jacker = jackes + num5
            var luck = isReadFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_luck/' + mai + '_luck.json')
            var lucks = luck.replace('luck:', '')
            var luckes = parseInt(lucks)
            var p_lucker = luckes + num4
            var m_lucker = luckes - 1
            var luckies = parseInt(1000) - luckes
            var cons = con.replace(num4, '')
            var cont = cons.replace(num5, '')
            var jackpot = jackes + cot3
            var cots = cons.replace(':', '')
            var conts = con.replace(cons, '')
            if(num4 <= 1) {
                bot.createMessage(msg.channel.id, {
                    embed: {
                        author: {
                            name:　'[乱数最大値の不足]',
                        },
                        description: '乱数の最大値に' + num4 + 'は選択できません。\n2以上を選択してください。', 
                        color: 0xff3838,
                        timestamp: new Date(),
                    }
                })
            }
            else if(num5 <= 2) {
                bot.createMessage(msg.channel.id, {
                    embed: {
                        author: {
                            name:　'[かけ金最大値の不足]',
                        },
                        description: 'かけ金の最大値に' + num5 + 'は選択できません。\n3以上を選択してください。', 
                        color: 0xffdb0f,
                        timestamp: new Date(),
                    }
                })                
            }
            else if(cot3 < num5){
                bot.createMessage(msg.channel.id, {
                    embed: {
                        author: {
                            name:　'[かけ金の不足]',
                        },
                        description: '所持コインが' + cot5 + '枚足りません。\nコインを貯めてください。(現在の所持枚数' + cot2 + '枚)', 
                        color: 0xffdb0f,
                        timestamp: new Date(),
                    }
                })  
            }
            else if(con == 'jackpot') {
                bot.createMessage(msg.channel.id, {
                    embed: {
                        author: {
                            name:　'[JACKPOT]',
                        },
                        description: '現在のジャックポット枚数は' + jacks + '枚です。', 
                        color: 0xfff200,
                        timestamp: new Date(),
                    }
                })  
            }
            else if(con == 'luck') {
                if(luckes < 0) {
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_luck/' + mai + '_luck.json', 'luck:0')
                    bot.createMessage(msg.channel.id, {
                        embed: {
                            author: {
                                name:　'[LUCK]',
                            },
                            description: '現在の運は0です。\nジャックポット(' + jacks + '枚)獲得まであと' + luckies + 'の運が必要です。', 
                            color: 0xfff200,
                            timestamp: new Date(),
                        }
                    })  
                }
                else {
                    bot.createMessage(msg.channel.id, {
                        embed: {
                            author: {
                                name:　'[LUCK]',
                            },
                            description: '現在の運は' + lucks + 'です。\nジャックポット(' + jacks + '枚)獲得まであと' + luckies + 'の運が必要です。', 
                            color: 0xfff200,
                            timestamp: new Date(),
                        }
                    }) 
                }
            }
            else if(luckes >= 1000) {
                isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json', 'coin:' + jackpot)
                isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_jackpot/jackpot.json', 'jackpot:0')
                isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_luck/' + mai + '_luck.json', 'luck:0') 
                bot.createMessage(msg.channel.id, {
                    embed: {
                        author: {
                            name:　'[MG-JACKPOT]',
                        },
                        description: '運が1000以上に達したためジャックポットが排出されました。\n<@' + mai + '>さんに' + jackes + '枚のコインを付与しました！(現在の所持枚数' + jackpot + '枚)', 
                        color: 0xfff200,
                        timestamp: new Date(),
                    }
                }) 
            }
            else if(con == 'help') {
                bot.createMessage(msg.channel.id, {
                    embed: {
                        author: {
                            name:　'[MGの遊び方]',
                        },
                        description: 'MGは乱数の最大値とかけ金を決めて遊ぶゲームです。\n基本は[s! mg <乱数の最大値>:<かけ金>]で遊ぶことができますが、乱数の最大値には1以下、かけ金には2以下が選択できません。\n乱数で1が出た場合は<乱数の最大値>×<かけ金>分のコインが手に入りますが、それ以外が出た場合はかけ金を失います。', 
                        color: 0x155dd8,
                        timestamp: new Date(),
                    }
                })
            }
            else if(cont != ':') {
                bot.createMessage(msg.channel.id, {
                    embed: {
                        author: {
                            name:　'[コマンド無し]',
                        },
                        description: 'そのようなコマンドは存在しません。', 
                        color: 0x155dd8,
                        timestamp: new Date(),
                    }
                })
            }
            else if(cots == '') {
                bot.createMessage(msg.channel.id, {
                    embed: {
                        author: {
                            name:　'[コマンド無し]',
                        },
                        description: 'そのようなコマンドは存在しません。', 
                        color: 0x155dd8,
                        timestamp: new Date(),
                    }
                })
            }
            else if(conts == '') {
                bot.createMessage(msg.channel.id, {
                    embed: {
                        author: {
                            name:　'[コマンド無し]',
                        },
                        description: 'そのようなコマンドは存在しません。', 
                        color: 0x155dd8,
                        timestamp: new Date(),
                    }
                })
            }
            else if(ran != 1) {
                if(luckes < 0) {
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_luck/' + mai + '_luck.json', 'luck:0')
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json', 'coin:' + cot4)
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_jackpot/jackpot.json', 'jackpot:' + jacker)
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_luck/' + mai + '_luck.json', 'luck:' + m_lucker)
                    bot.createMessage(msg.channel.id, {
                        embed: {
                            author: {
                                name:　'[結果]',
                            },
                            description: '【' + ran + '】\nコインを' + num5 + '枚失ってしまいました。(現在の所持枚数' + cot4 + '枚)', 
                            color: 0x155dd8,
                            timestamp: new Date(),
                        }
                    })
                }
                else {
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json', 'coin:' + cot4)
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_jackpot/jackpot.json', 'jackpot:' + jacker)
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_luck/' + mai + '_luck.json', 'luck:' + m_lucker)
                    bot.createMessage(msg.channel.id, {
                        embed: {
                            author: {
                                name:　'[結果]',
                            },
                            description: '【' + ran + '】\nコインを' + num5 + '枚失ってしまいました。(現在の所持枚数' + cot4 + '枚)', 
                            color: 0x155dd8,
                            timestamp: new Date(),
                        }
                    })
                }
            }
            else if(ran == 1) {
                if(luckes < 0) {
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_luck/' + mai + '_luck.json', 'luck:0')
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json', 'coin:' + num8)
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_luck/' + mai + '_luck.json', 'luck:' + p_lucker) 
                    bot.createMessage(msg.channel.id, {
                        embed: {
                            author: {
                                name:　'[結果]',
                            },
                            description: 'コインを' + num7 + '枚獲得しました！(倍率' + num6 + '倍)\n(現在の所持枚数' + num8 + '枚)', 
                            color: 0xffdb0f,
                            timestamp: new Date(),
                        }
                    })
                }
                else {
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/coin_data/' + mai + '_coin.json', 'coin:' + num8)
                    isWriteFile('C:/Users/味噌ラーメン/Desktop/Discord-Bots/snack-opb総合データファイル/ユーザーデータ/mg_luck/' + mai + '_luck.json', 'luck:' + p_lucker) 
                    bot.createMessage(msg.channel.id, {
                        embed: {
                            author: {
                                name:　'[結果]',
                            },
                            description: 'コインを' + num7 + '枚獲得しました！(倍率' + num6 + '倍)\n(現在の所持枚数' + num8 + '枚)', 
                            color: 0xffdb0f,
                            timestamp: new Date(),
                        }
                    })
                }
            }

        }
    }
    if(msg.content == 's! help') {
        bot.createMessage(msg.channel.id, {
            embed: {
                author: {
                    name:　'[コマンドヘルプ]',
                },
                description: '__**s! help**__\nこのメッセージを再度表示します。\n__**s! C:userdata**__\nあなたのデータを作成します。\nすでにある場合は作成できません。\n__**s! D:userdata**__\nあなたのデータを削除します。\n__**s! coin**__\n現在のコインの所持枚数を表示します。\n__**s! mg help**__\nMGの遊び方を表示します。\n__**s! mg <乱数最大値>:<かけ金>**__\n乱数で1が出たなら<乱数最大値>×<かけ金>を手に入れ、1以外ならかけ金を失います。\n__**s! mg jackpot**__\n現在のジャックポット数を表示します。\n__**s! mg luck**__\n現在の運を表示します。', 
                color: 0x155dd8,
                timestamp: new Date(),
            }
        })
    }
})


//////////////////////////////////////
//「dis接続」//////////////////////////
                                   ///
bot.connect()   //discordに接続    ///
                                  ///
/////////////////////////////////////
/////////////////////////////////////