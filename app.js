new Vue({
    el: "#App",
    data: {
        player_heal: 100,
        moster_heal: 100,
        gane_is_on: false,
        logs: []
    },
    methods: {
        start_game: function () {
            this.gane_is_on = true;
        },
        attack: function () {
            const point = Math.ceil(Math.random() * 10);
            this.player_heal -= point;
            this.add_to_log({ turn: "p", text: "OYUNCU ATAĞI (" + point + ")" })
            this.attack_moster();
        },
        special_attak: function () {
            const point = Math.ceil(Math.random() * 25);
            this.player_heal -= point;
            this.add_to_log({ turn: "p", text: "ÖZEL OYUNCU ATAĞI (" + point + ")" })
            this.attack_moster();
        },
        heal_up: function () {
            const point = Math.ceil(Math.random() * 20);
            this.player_heal += point;
            this.add_to_log({ turn: "p", text: "İLK YARDIM (" + point + ")" })
            this.attack_moster();
        },
        give_up: function () {
            this.player_heal = 0
            this.add_to_log({ turn: "p", text: "OYUNCU PEST ETTİ!" })
        },
        attack_moster: function () {
            const point = Math.ceil(Math.random() * 15);
            this.moster_heal -= point;
            this.add_to_log({ turn: "m", text: "CANAVAR ATAĞI (" + point + ")" })
        },
        add_to_log: function (array) {
            this.logs.push(array)
        }
    },
    watch: {
        player_heal: function (value) {
            if (value <= 0) {
                this.player_heal = 0;
                if (confirm("Oyunu KAYBETTİN. Tekrar demek ister misiniz?")) {
                    this.player_heal = 100;
                    this.moster_heal = 100;
                    this.logs = []
                }
            }
            else if (value >= 100) {
                this.player_heal = 100
            }
        },
        moster_heal: function (value) {
            if (value <= 0) {
                this.moster_heal = 0;
                if (confirm("Oyunu KAZANDINIZ. Tekrar demek ister misiniz?")) {
                    this.player_heal = 100;
                    this.moster_heal = 100;
                    this.logs = []
                }
            }

        }
    }
})