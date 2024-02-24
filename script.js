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
        }).catch();
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
        let index = Number(e.target.value);
        downStat.children[index].setAttribute("disabled", "");
    });
    downStat.addEventListener('change', e => {
        console.log(2);
        for(let i = 0; i < 6; i++) {
            upStat.children[i+1].removeAttribute("disabled");
        }
        let index = Number(e.target.value);
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

    // クリック位置の座標計算（canvasの左上を基準。-2ずつしているのはborderの分）
    var rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - Math.floor(rect.left) - 2;
    mouseY = e.clientY - Math.floor(rect.top) - 2;

    console.log(mouseX, mouseY);
    }
    // TODO
    // 各ステータスをクリックすることで数値に補正をかけれるように変更する
    // 1(+2) といった感じに大きく合計値を表示し、小さく補正値を表示する感じ
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

function getClass(classId) {
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

    return classData[classId];
}

function getType(typeId) {
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

    return typeData[typeId];
}

function getCover(coverId) {
    let coverData = [
        {
            "name": ""
        },
        {
            "name": "アクティブ"
        },
        {
            "name": "スマート"
        },
        {
            "name": "ユニーク"
        }
    ];

    return coverData[coverId];
}

function getStatus(c) {
    let status = [0, 0, 0, 0, 0, 0];
    let classData = getClass(c.classId);
    let typeData = getType(c.typeId);
    let coverData = getCover(c.coverId);

    for(let i = 0; i < 6; i++) {
        status[i] += classData.stat[i];
        status[i] += typeData .stat[i];
        if(c.upStat-1   == i) status[i] += 1;
        if(c.downStat-1 == i) status[i] -= 1;
    }

    return {
        status: status,
        class:  classData,
        type:   typeData,
        cover:  coverData
    };
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
    output(name);
}

function setStatus(skillData, ctx) {
    let c = getSelect();
    let d = getStatus(c);
    
    ctx.font = "26px sans-serif";
    setClass(d.class.name, ctx);
    setType (d.type.name , ctx);
    setCover(d.cover.name, ctx);
    
    setGood(d.status, ctx);
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

// TODO
// 二つ目,三つ目のスキルを表示できるようにする
// 説明文をどうにかする
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

    // 枠に入り切らないからコメントアウト
    // setDetail(skill.detail, ctx);
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

function output(name) {
    let status = getStatus(getSelect()).status;
    let command = "";
    for(let i = 0; i < 15; i++) {
        if(i) command += "\\n";
        command += `{気合:${i+1}} 【故障チェック:${i+1}】`;
    }
    let spilit = '{"label":"気合:1","value":"1D6"},{"label":"気合:2","value":"1D6+2"},{"label":"気合:3","value":"2D6"},{"label":"気合:4","value":"3D6"},{"label":"気合:5","value":"3D6+1"},{"label":"気合:6","value":"4D6"},{"label":"気合:7","value":"5D6"},{"label":"気合:8","value":"5D6+1"},{"label":"気合:9","value":"5D6+2"},{"label":"気合:10","value":"6D6"},{"label":"気合:11","value":"5D6"},{"label":"気合:12","value":"5D6-1"},{"label":"気合:13","value":"5D6-2"},{"label":"気合:14","value":"4D6-1"},{"label":"気合:15","value":"4D6-2"}'
    let text = `{"kind":"character","data":{"name":"${name}","commands":"${command}","status":[],"params":[{"label":"競","value":"${status[0]}"},{"label":"練","value":"${status[1]}"},{"label":"体","value":"${status[2]}"},{"label":"心","value":"${status[3]}"},{"label":"友","value":"${status[4]}"},{"label":"噂","value":"${status[5]}"},${spilit}]}}`;
    navigator.clipboard.writeText(text);
}
