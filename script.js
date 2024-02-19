console.log(2);
window.addEventListener("load", e => {
    let btn = document.getElementById("naming");
    btn.addEventListener("click", naming);

    let inputElem = document.querySelectorAll("select");
    [...inputElem].forEach(e => {
        e.addEventListener("change",() => {
            ctx.drawImage(img, 0, 0);
            putStatus(ctx);
        })
    })

    let upStat = document.getElementById("good");
    let downStat = document.getElementById("bad");
    upStat.addEventListener("change", e => {
        console.log(1);
        for(let i = 0; i < 6; i++) {
            downStat.children[i+1].removeAttribute("disabled");
        }
        let index = Number(e.target.value)+1;
        downStat.children[index].setAttribute("disabled", "");
    });
    downStat.addEventListener('change', e => {
        console.log(2);
        for(let i = 0; i < 6; i++) {
            upStat.children[i+1].removeAttribute("disabled");
        }
        let index = Number(e.target.value)+1;
        upStat.children[index].setAttribute("disabled", "");
    });


    let canvas = document.getElementById("sheet");
    // let ctx = canvas.getContext("2d");
    window.ctx = canvas.getContext("2d");
    

    let img = document.getElementById("origin");
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img ,0 ,0);
    img.remove();

    ctx.font = '26px sans-serif';
    // クリックイベントの登録
  canvas.onclick = function(e) {
    // 一度描画をクリア
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // クリック位置の座標計算（canvasの左上を基準。-2ずつしているのはborderの分）
    var rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - Math.floor(rect.left) - 2;
    mouseY = e.clientY - Math.floor(rect.top) - 2;

    // クリック位置を中心に円を描画
    // ctx.beginPath();
    // ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2, false);
    // ctx.fill();

    console.log(mouseX, mouseY);
    }
})

function getSelect() {
    let c = {
        classId  :document.getElementById("class").value,
        typeId   :document.getElementById("type") .value,
        coverId  :document.getElementById("cover").value,
        upStat   :document.getElementById("good") .value,
        downStat :document.getElementById("bad")  .value
    };
    return c;
}

function naming() {
    let c = getSelect();
    if(c.classId * c.typeId * c.coverId * c.upStat * c.downStat == 0) {
        alert("いずれかのフォームが入力されていません");
        return -1;
    }

    let name = document.getElementById("name").value;
    ctx.fillText(name, 310, 105);
}

function putStatus(ctx) {
    let c = getSelect();

    let status = [0, 0, 0, 0, 0, 0];
    let classData = [
        {
            name: "",
            stat: [0, 0, 0, 0, 0, 0]
        },
        {
            name: "ネバーエンド", 
            stat: [0, 0, 1, 1, 0, 0]
        },
        {
            name: "ビヨンド", 
            stat: [0, 1, 0, 1, 0, 0]
        },
        {
            name: "ロイヤルロード", 
            stat: [0, 1, 0, 0, 0, 1]
        },
        {
            name: "プリンセス", 
            stat: [0, 0, 1, 0, 1, 0]
        },
        {
            name: "Vコード", 
            stat: [1, 0, 0, 1, 0, 0]
        },
        {
            name: "ランバージャック", 
            stat: [1, 1, 0, 0, 0, 0]
        },
        {
            name: "プレーン", 
            stat: [0, 0, 0, 0, 1, 1]
        },
        {
            name: "デアボリカ", 
            stat: [1, 0, 0, 0, 0, 1]
        },    
    ];
    let typeData = [
        {
            name: "",
            stat: [0, 0, 0, 0, 0, 0]
        },{
            name: "プライド",
            stat: [1, 0, 0, 0, 0, 0]
        },
        {
            name: "カレッジ",
            stat: [0, 0, 0, 0, 0, 1]
        },
        {
            name: "フリーダム",
            stat: [0, 0, 1, 0, 0, 0]
        },
        {
            name: "テンパランス",
            stat: [0, 0, 0, 1, 0, 0]
        },
        {
            name: "ホープ",
            stat: [0, 1, 0, 0, 0, 0]
        },
        {
            name: "ジャスティス",
            stat: [0, 0, 1, 0, 0, 0]
        },
        {
            name: "スロウス",
            stat: [0, 0, 0, 0, 0, 1]
        },
        {
            name: "グラトニー",
            stat: [0, 0, 0, 0, 1, 0]
        }
    ];
    let coverData = [
        "",
        "アクティブ",
        "スマート",
        "ユニーク"
    ];

    putClass(classData[c.classId].name, ctx);
    putType (typeData [c.typeId] .name, ctx);
    putCover(coverData[c.coverId]     , ctx);
    for(let i = 0; i < 6; i++) {
        status[i] += classData[c.classId].stat[i];
        status[i] += typeData[c.typeId]  .stat[i];
        if(c.upStat-1   == i) status[i] += 1;
        if(c.downStat-1 == i) status[i] -= 1;
    }
    
    setGood(status, ctx);
};

function putClass(text, ctx) {
    ctx.fillText(text, 325, 155);
};
function putType(text, ctx) {
    ctx.fillText(text, 325, 202.5);
};
function putCover(text, ctx) {
    ctx.fillText(text, 325, 250);
};

function setGood(field, ctx) {
    for(let i = 0; i < 6; i++) {
        ctx.fillText(field[i], 850, 125+47*i);
    }
};