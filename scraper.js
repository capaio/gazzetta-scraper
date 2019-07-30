'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');
const url_marks = 'https://www.gazzetta.it/calcio/fantanews/voti/serie-a-2018-19/';
const url_players = 'https://www.gazzetta.it/calcio/fantanews/statistiche/serie-a-2018-19/';


exports.getMarks = function (giornata) {
    return new Promise((resolve, reject) => {

        rp(url_marks + 'giornata-' + giornata)
            .then(function(html){

                var players = [];

                const $ = cheerio.load(html);

                var rows = $('table.playerStats tr');

                $(rows).each(function(i, row){
                    var player = Object();
                    player.nome = $($('.playerNameIn > a', row)).html();
                    player.voto = $($('.vParameter', row)).text();
                    player.goal = ($($('.inParameter:nth-child(3)', row)).text()).replace("\n\t\t  \t\t\t", '').replace('\n\t\t  ', '').replace('\n-\t\t  ', '0');
                    player.goalSubito = 0;
                    if( parseInt(player.goal) < 0 ) {
                        player.goalSubito = player.goal;
                        player.goal = 0;
                    }
                    player.assist = ($($('.inParameter:nth-child(4)', row)).text()).replace('-', '0');
                    player.ammonito = ($($('.inParameter:nth-child(8)', row)).text()).replace('-', '0');
                    player.espulso = ($($('.inParameter:nth-child(9)', row)).text()).replace('-', '0');
                    player.autogol = ($($('.inParameter:nth-child(7)', row)).text()).replace('-', '0');
                    players.push(player);

                });
                resolve(players);

            })
            .catch(function(err){
                reject(err)
            })
    });
};


exports.getAllPlayers = function () {
    return new Promise((resolve, reject) => {

        rp(url_players)
            .then(function(html){

                var players = [];

                const $ = cheerio.load(html);

                var rows = $('table.playerStats tbody tr');

                $(rows).each(function(i, row){
                    var player = Object();

                    player.name = ($($('td:nth-child(3) a', row)).html());
                    player.team = ($($('td:nth-child(2) span', row)).html());
                    player.position = ($($('td.field-ruolo', row)).html()).replace('T (', '').replace(')', '');
                    player.id =  ($($('td:nth-child(3) a', row)).attr('href')).match(/[0-9]+/)[0];
                    players.push(player);

                });
                resolve(players);

            })
            .catch(function(err){
                reject(err)
            })
    });
};
