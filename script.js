console.log(2);
window.addEventListener("load", e => {
    let jsonData = {
        skillList: {}
    };
    console.log("loaded");
    fetch("./uniqueSkillList.json")
        .then(e => {return e.json();}).catch(console.error)
        .then(jsondata => {
            console.log(jsondata);
            jsonData.skillList = jsondata;
            init(jsonData);
        });
})

function init(jsonData) {
    console.log("initialize");
    
    let btn = document.getElementById("naming");
    btn.addEventListener("click", naming);

    let inputElem = document.querySelectorAll("select");
    [...inputElem].forEach(e => {
        e.addEventListener("change",() => {
            ctx.drawImage(sheet, 0, 0);
            setStatus(jsonData.skillList, ctx);
            setPicture(charactorImg, ctx);
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
    

    let sheet = document.getElementById("origin");
    canvas.height = sheet.height;
    canvas.width = sheet.width;
    ctx.drawImage(sheet ,0 ,0);
    sheet.remove();

    let upload = document.getElementById("upload");
    let charactorImg = document.createElement("img");
    upload.addEventListener("change", e => {
        charactorImg.addEventListener("load", () => {
            console.log("img_load");
            setPicture(charactorImg, ctx);
        });

        const file_reader = new FileReader();
        file_reader.addEventListener('load', () => {
            const uploaded_image = file_reader.result;
            charactorImg.src = uploaded_image;
        });
        file_reader.readAsDataURL(e.target.files[0]);
    })

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
}

function getSelect() {
    let c = {
        classId : document.getElementById("class").value,
        typeId  : document.getElementById("type") .value,
        coverId : document.getElementById("cover").value,
        upStat  : document.getElementById("good") .value,
        downStat: document.getElementById("bad")  .value,
        skillId : document.getElementById("skill").value
    };
    return c;
}

function naming() {
    let c = getSelect();
    if(c.classId * c.typeId * c.coverId * c.upStat * c.downStat * c.skillId == 0) {
        alert("いずれかのフォームが入力されていません");
        return -1;
    }

    let name = document.getElementById("name").value;
    ctx.font = "26px sans-serif";
    ctx.fillText(name, 310, 105);
}

function setStatus(skillData, ctx) {
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

    ctx.font = "26px sans-serif";
    setClass(classData[c.classId].name, ctx);
    setType (typeData [c.typeId] .name, ctx);
    setCover(coverData[c.coverId]     , ctx);
    for(let i = 0; i < 6; i++) {
        status[i] += classData[c.classId].stat[i];
        status[i] += typeData[c.typeId]  .stat[i];
        if(c.upStat-1   == i) status[i] += 1;
        if(c.downStat-1 == i) status[i] -= 1;
    }
    
    setGood(status, ctx);
    setSkill(skillData[c.skillId], 0, ctx);
};

function setClass(text, ctx) {
    ctx.fillText(text, 325, 155);
};
function setType(text, ctx) {
    ctx.fillText(text, 325, 202.5);
};
function setCover(text, ctx) {
    ctx.fillText(text, 325, 250);
};

function setGood(field, ctx) {
    for(let i = 0; i < 6; i++) {
        ctx.fillText(field[i], 850, 125+47*i);
    }
};

function setSkill(skill, number, ctx) {
    ctx.font = "16px sans-serif";

    console.log(skill);
    ctx.fillText(skill.name, 305, 424.5);
    let timing = "";
    skill.timing.forEach((e, i) => {
        if(i) timing += ", ";
        switch (e) {
            case "シナリオフェイズ": timing += "シナ"; break;
            case "ゴール前": timing += "G前"; break;
            case "スタート": timing += "S"; break;
            case "第２": timing += "2"; break;
            case "第３": timing += "3"; break;
            default: timing += e; break;
        }
    })
    ctx.fillText(timing, 570, 424.5);
    ctx.fillText(skill.spirit, 700, 424.5);

    // ctx.font = "26px sans-serif";
    ctx.fillText(skill.number_of_uses, 700, 458.5);

    setDetail(skill.detail, ctx);
}

function setDetail(text, ctx) {
    let fontSize = 8;
    ctx.font = `${fontSize}px sans-serif`;
    let lineHeight = 1.2 ;	// 行の高さ (フォントサイズに対する倍率)

    // 1行ずつ描画
    let lines = text.split("\n");
    for(let i = 0; i < lines.length; i++) {
        let addY = fontSize * lineHeight * i;
        ctx.fillText(lines[i], 290, 442 + addY) ;
    }
}

function setPicture(img, ctx) {
    let maxLen = Math.max(img.width, img.height);
    let sx = (img.width  - maxLen) / 2;
    let sy = (img.height - maxLen) / 2;
    
    let color = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(921, 105, 200, 200);
    ctx.drawImage(img, sx, sy, maxLen, maxLen, 921, 105, 200, 200);
    ctx.fillStyle = color;
}
