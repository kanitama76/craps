cp=""
pn=""
var score = new Object();
score_list = [];
window.onbeforeunload = function () {
  return "リロード禁止です！";
};

function myFunction(sc) {
    // ここに実行したいコードを書く
    //エラーチェック（プレイヤーとポイントナンバーの変更がないか）
    var checkplayer = $('input[name="btnradio1"]:checked').val();
    var pointnumber = $('input[name="btnradio2"]:checked').val();

    switch(pointnumber){
        case("btnradio21"):
            pointnumber=4
            break
        case("btnradio22"):
            pointnumber=5
            break
        case("btnradio23"):
            pointnumber=6
            break
        case("btnradio24"):
            pointnumber=8
            break                                
        case("btnradio25"):
            pointnumber=9
            break        
        case("btnradio26"):
            pointnumber=10
            break
    }
    switch(checkplayer){
        case("btnradio11"):
            checkplayer="Player A"
            break
        case("btnradio12"):
            checkplayer="Player B"
            break
        case("btnradio13"):
            checkplayer="Player C"
            break
        case("btnradio14"):
            checkplayer="Player D"
            break                                
    }

    //うまくいかないので以下保留
    hardwaycheck = document.getElementsByName("but_hard")[0].className;
    hardwaycheck = hardwaycheck.indexOf("active");
    if(hardwaycheck!="-1"){
        hardwaycheck=true;
    }else{
        hardwaycheck=false;
    }

    if(cp=="" || score_list.length==0){
        cp=checkplayer;
    }else{
        if(score_list[score_list.length-1][0].player!=checkplayer && score_list[score_list.length-1][0].score!=7){
            alert("プレイヤーが変更されています");
            return;
        }else{
            cp=checkplayer;
        }
    }
    if(pn=="" || score_list.length==0){
        pn= pointnumber;
    }else{
        if(score_list[score_list.length-1][0].point!= pointnumber && score_list[score_list.length-1][0].score!=7 && score_list[score_list.length-1][0].point!= score_list[score_list.length-1][0].score){
            alert("ポイントナンバーが変更されています");
            return;
        }else{
            pn= pointnumber;
        }
    }

    //Objectに値を追加

     score={
        player:cp,
        point:pn,
        score:sc,
        hc:hardwaycheck,
    };
    score_list[score_list.length] = [score];

    //テーブルに追加

    document.getElementById('hb').innerHTML ='<button type="button" class="me-auto btn btn-outline-primary btn-custom-size3" name="but_hard" data-bs-toggle="button">Hardway</button>';

    viewtable();
    }

function viewtable(){
    table=document.getElementById("score_table")
    x=1;
    y=0;
    document.querySelectorAll( ":is( th, td )" ).forEach( cell =>
        cell.textContent = "" );
    document.querySelectorAll( ":is( th, td )" ).forEach( cell =>
        cell.style = null );

    for (let index = 0; index < score_list.length; index++) {
        element = score_list[index];
        table.rows[y].cells[0].innerHTML =element[0].player;
        switch (element[0].player) {
            case "Player A":
                table.rows[y].cells[0].style.backgroundColor ='#b0c4de';
                break;
            case "Player B":
                table.rows[y].cells[0].style.backgroundColor ='#fffacd';
                break;
            case "Player C":
                table.rows[y].cells[0].style.backgroundColor ='#66cdaa';
                break;
            case "Player D":
                table.rows[y].cells[0].style.backgroundColor ='#dda0dd';
                break;
        }
        table.rows[y].cells[x].innerHTML =getimg(element[0].score,element[0].hc,element[0].point);
        if(element[0].score ==7){
            y=y+1;
            x=1;
        }else{
            if(x<15){
            x=x+1;
            }else{
                y=y+1;
                x=1;
            }
        }
        
    }
    table.rows[y].cells[x].style.backgroundColor ='#dcdcdc';
    t7=0;
    w7=0;
    renz=0;
    renz_t=0;
    renw=0;
    renw_t=0;
    wint=0;
    for (let index = 0; index < score_list.length; index++) {
        element = score_list[index];
        if(element[0].score==7){
            t7=t7+1;
            renz=Math.max(renz,renz_t);
            renz_t=0;
            renw=Math.max(renw,renw_t);
            renw_t=0;            
        }else if(element[0].score==element[0].point){
            renz_t=renz_t+1;
            wint=wint+1;
            w7=w7+1;
            renw_t=renw_t+1;
        }else{
            renz_t=renz_t+1;
            w7=w7+1;
        }
    }
    if(isFinite((w7/t7).toFixed(2))){
        ave_c=(w7/t7).toFixed(2);
    }else{
        ave_c=w7.toFixed(2);
    }
    if(isFinite(Math.round((wint/t7)*100))){
        win_p=Math.round((wint/t7)*100);
    }else{
        win_p=wint*100;
    }
    document.getElementById('ave_c').innerHTML = ave_c+"回";
    document.getElementById('max_c').innerHTML = Math.max(renz,renz_t)+"回";

    document.getElementById('win_t').innerHTML = Math.max(renw,renw_t)+"回";
    document.getElementById('sev_p').innerHTML = Math.round((t7/(w7+t7))*100)+"%";

}
function back(){
    score_list.pop();
    document.querySelectorAll( ":is( th, td )" ).forEach( cell =>
        cell.textContent = "" );
    viewtable();

}

function getimg(scr,hrdck,pntn){
    switch(scr){
        case 2:
            return '<img src="./src/2.png" class="scrimg"></img>';
        case 3:
            return '<img src="./src/3.png" class="scrimg"></img>';
        case 4:
            if(hrdck==true && pntn==4){
                return '<img src="./src/hw4.png" class="scrimg"></img>';
            }else if(pntn==4){
                return '<img src="./src/w4.png" class="scrimg"></img>';
            }else if(hrdck==true){
                return '<img src="./src/h4.png" class="scrimg"></img>';
            }
            return '<img src="./src/4.png" class="scrimg"></img>';
        case 5:
            if(pntn==5){
                return '<img src="./src/w5.png" class="scrimg"></img>';
            }
            return '<img src="./src/5.png" class="scrimg"></img>';
        case 6:
            if(hrdck==true && pntn==6){
                return '<img src="./src/hw6.png" class="scrimg"></img>';
            }else if(pntn==6){
                return '<img src="./src/w6.png" class="scrimg"></img>';
            }else if(hrdck==true){
                return '<img src="./src/h6.png" class="scrimg"></img>';
            }
            return '<img src="./src/6.png" class="scrimg"></img>';
        case 7:
            return '<img src="./src/7.png" class="scrimg"></img>';
        case 8:
            if(hrdck==true && pntn==8){
                return '<img src="./src/hw8.png" class="scrimg"></img>';
            }else if(pntn==8){
                return '<img src="./src/w8.png" class="scrimg"></img>';
            }else if(hrdck==true){
                return '<img src="./src/h8.png" class="scrimg"></img>';
            }
            return '<img src="./src/8.png" class="scrimg"></img>';
        case 9:
            if(pntn==9){
                return '<img src="./src/w9.png" class="scrimg"></img>';
            }
            return '<img src="./src/9.png" class="scrimg"></img>';
        case 10:
            if(hrdck==true && pntn==10){
                return '<img src="./src/hw10.png" class="scrimg"></img>';
            }else if(pntn==10){
                return '<img src="./src/w10.png" class="scrimg"></img>';
            }else if(hrdck==true){
                return '<img src="./src/h10.png" class="scrimg"></img>';
            }
            return '<img src="./src/10.png" class="scrimg"></img>';
        case 11:
            return '<img src="./src/11.png" class="scrimg"></img>';
        case 12:
            return '<img src="./src/12.png" class="scrimg"></img>';
    }

}
function detail(){
    at7=0;
    aw7=0;
    arenz=0;
    arenz_t=0;
    arenw=0;
    arenw_t=0;
    awint=0;
    bt7=0;
    bw7=0;
    brenz=0;
    brenz_t=0;
    brenw=0;
    brenw_t=0;
    bwint=0;
    ct7=0;
    cw7=0;
    crenz=0;
    crenz_t=0;
    crenw=0;
    crenw_t=0;
    cwint=0;
    dt7=0;
    dw7=0;
    drenz=0;
    drenz_t=0;
    drenw=0;
    drenw_t=0;
    dwint=0;
    for (let index = 0; index < score_list.length; index++) {
        element = score_list[index];
        if(element[0].score==7){
            switch(element[0].player){ 
                case"Player A" :
                at7=at7+1;
                arenz=Math.max(arenz,arenz_t);
                arenz_t=0;
                arenw=Math.max(arenw,arenw_t);
                arenw_t=0;
                break;
                case"Player B" :
                bt7=bt7+1;
                brenz=Math.max(brenz,brenz_t);
                brenz_t=0;
                brenw=Math.max(brenw,brenw_t);
                brenw_t=0;
                break;
                case"Player C" :
                ct7=ct7+1;
                crenz=Math.max(crenz,crenz_t);
                crenz_t=0;
                crenw=Math.max(crenw,crenw_t);
                crenw_t=0;
                break;
                case"Player D" :
                dt7=dt7+1;
                drenz=Math.max(drenz,drenz_t);
                drenz_t=0;
                drenw=Math.max(drenw,drenw_t);
                drenw_t=0;
                break;
            }

        }else if(element[0].score==element[0].point){
            switch(element[0].player){ 
                case"Player A" :
                arenz_t=arenz_t+1;
                awint=awint+1;
                aw7=aw7+1;
                arenw_t=arenw_t+1;
                break;
                case"Player B" :
                brenz_t=brenz_t+1;
                bwint=bwint+1;
                bw7=bw7+1;
                brenw_t=brenw_t+1;
                break;
                case"Player C" :
                crenz_t=crenz_t+1;
                cwint=cwint+1;
                cw7=cw7+1;
                crenw_t=crenw_t+1;
                break;
                case"Player D" :
                drenz_t=drenz_t+1;
                dwint=dwint+1;
                dw7=dw7+1;
                drenw_t=drenw_t+1;
                break;
            }
        }else{
            switch(element[0].player){ 
                case"Player A" :
                arenz_t=arenz_t+1;
                aw7=aw7+1;
                break;
                case"Player B" :
                brenz_t=brenz_t+1;
                bw7=bw7+1;
                break;
                case"Player C" :
                crenz_t=crenz_t+1;
                cw7=cw7+1;
                break;
                case"Player D" :
                drenz_t=drenz_t+1;
                dw7=dw7+1;
                break;
            }            

        }
    }
    if(isFinite((aw7/at7).toFixed(2))){
        aave_c=(aw7/at7).toFixed(2);
    }else{
        aave_c=aw7.toFixed(2);
    }
    if(isFinite((bw7/bt7).toFixed(2))){
        bave_c=(bw7/bt7).toFixed(2);
    }else{
        bave_c=bw7.toFixed(2);
    }
    if(isFinite((cw7/ct7).toFixed(2))){
        cave_c=(cw7/ct7).toFixed(2);
    }else{
        cave_c=cw7.toFixed(2);
    }
    if(isFinite((dw7/dt7).toFixed(2))){
        dave_c=(dw7/dt7).toFixed(2);
    }else{
        dave_c=dw7.toFixed(2);
    }
    if(isFinite(Math.round((awint/at7)*100))){
        awin_p=Math.round((awint/at7)*100);
    }else{
        awin_p=awint*100;
    }
    if(isFinite(Math.round((bwint/bt7)*100))){
        bwin_p=Math.round((bwint/bt7)*100);
    }else{
        bwin_p=bwint*100;
    }
    if(isFinite(Math.round((cwint/ct7)*100))){
        cwin_p=Math.round((cwint/ct7)*100);
    }else{
        cwin_p=cwint*100;
    }
    if(isFinite(Math.round((dwint/dt7)*100))){
        dwin_p=Math.round((dwint/dt7)*100);
    }else{
        dwin_p=dwint*100;
    }

    if((at7+aw7)==0){
        aw7=1;
    }
    if((bt7+bw7)==0){
        bw7=1;
    }
    if((ct7+cw7)==0){
        cw7=1;
    }
    if((dt7+dw7)==0){
        dw7=1;
    }

    document.getElementById('aave_c').innerHTML = aave_c+"回";
    document.getElementById('amax_c').innerHTML = Math.max(arenz,arenz_t)+"回";
    document.getElementById('awin_p').innerHTML = awin_p+"%";
    document.getElementById('awin_t').innerHTML = Math.max(arenw,arenw_t)+"回";
    document.getElementById('asev_p').innerHTML = Math.round((at7/(at7+aw7))*100)+"%";
    document.getElementById('bave_c').innerHTML = bave_c+"回";
    document.getElementById('bmax_c').innerHTML = Math.max(brenz,brenz_t)+"回";
    document.getElementById('bwin_p').innerHTML = bwin_p+"%";
    document.getElementById('bwin_t').innerHTML = Math.max(brenw,brenw_t)+"回";
    document.getElementById('bsev_p').innerHTML = Math.round((bt7/(bt7+bw7))*100)+"%";
    document.getElementById('cave_c').innerHTML = cave_c+"回";
    document.getElementById('cmax_c').innerHTML = Math.max(crenz,crenz_t)+"回";
    document.getElementById('cwin_p').innerHTML = cwin_p+"%";
    document.getElementById('cwin_t').innerHTML = Math.max(crenw,crenw_t)+"回";
    document.getElementById('csev_p').innerHTML = Math.round((ct7/(ct7+cw7))*100)+"%";
    document.getElementById('dave_c').innerHTML = dave_c+"回";
    document.getElementById('dmax_c').innerHTML = Math.max(drenz,drenz_t)+"回";
    document.getElementById('dwin_p').innerHTML = dwin_p+"%";
    document.getElementById('dwin_t').innerHTML = Math.max(drenw,drenw_t)+"回";
    document.getElementById('dsev_p').innerHTML = Math.round((dt7/(dt7+dw7))*100)+"%";

    const ctx = document.getElementById('barchart').getContext('2d');

    t2=0;
    t3=0;
    t4=0;
    t5=0;
    t6=0;
    t7=0;
    t8=0;
    t9=0;
    t10=0;
    t11=0;
    t12=0;

    for (let index = 0; index < score_list.length; index++) {
        const element = score_list[index];
        switch(element[0].score){
            case 2 :
                t2=t2+1;
                break;
            case 3 :
                t3=t3+1;
                break;
            case 4 :
                t4=t4+1;
                break;
            case 5 :
                t5=t5+1;
                break;
            case 6 :
                t6=t6+1;
                break;
            case 7 :
                t7=t7+1;
                break;
            case 8 :
                t8=t8+1;
                break;
            case 9 :
                t9=t9+1;
                break;
            case 10 :
                t10=t10+1;
                break;
            case 11 :
                t11=t11+1;
                break;
            case 12 :
                t12=t12+1;
                break;
        }
    }
    if (typeof myAnimationChart!="undefined") {
        myAnimationChart.destroy();
      }


    // グラフを作成
    myAnimationChart = new Chart(ctx, {
      type: 'bar', // グラフの種類を指定
      data: {
        labels: ['2', '3', '4', '5', '6','7', '8', '9', '10', '11','12'],
        datasets: [{
          label: '出現回数',
          data: [t2, t3, t4, t5, t6,t7,t8,t9,t10,t11,t12],


          borderWidth: 1
        }]
      },
      options: {
        animation: {
          duration: 2000, // アニメーションの持続時間を指定 (単位: ミリ秒)
          easing: 'easeInOutBounce' // アニメーションのイージングを指定
        }
      }
    });

}

function rest(){
    result = window.confirm('保持データをリセットします。');
    if(result){
        cp=""
        pn=""
        score_list = [];
        document.querySelectorAll( ":is( th, td )" ).forEach( cell =>
           cell.textContent = "" );
        document.querySelectorAll( ":is( th, td )" ).forEach( cell =>
            cell.style = null );
        viewtable();
    }

}

const apiUrl = 'https://script.google.com/macros/s/AKfycbzWrIr_fTJ-e-L6ScdgKcl8THOSGqWbTKeE2oUAKvlaovxHQqzr2Bsj8XEUyodZfNjR/exec'; // ← あなたのGoogle Apps Script URLに差し替え
let allNames = [];
let selectedNames = [];

// モーダルを開く
async function playerchoise() {
  if (allNames.length === 0) {
    const res = await fetch(apiUrl);
    const data = await res.json();
    allNames = data.map(row => row["名前"]);
  }

  const container = document.getElementById("playerModalBody");
  container.innerHTML = "";

  allNames.forEach(name => {
    const isChecked = selectedNames.includes(name) ? "checked" : "";
    const item = document.createElement("div");
    item.classList.add("form-check");
    item.innerHTML = `
      <input class="form-check-input" type="checkbox" value="${name}" id="chk_${name}" ${isChecked}>
      <label class="form-check-label" for="chk_${name}">${name}</label>
    `;
    item.querySelector("input").addEventListener("change", () => {
      const checked = container.querySelectorAll("input:checked");
      if (checked.length > 6) {
        item.querySelector("input").checked = false;
        alert("最大6人まで選択できます。");
      }
    });
    container.appendChild(item);
  });

  // モーダル表示（Bootstrap 5）
  const modal = new bootstrap.Modal(document.getElementById('playerModal'));
  modal.show();
}

// 決定ボタンで呼ばれる
function confirmSelection() {
  const checkboxes = document.querySelectorAll("#playerModalBody input:checked");
  selectedNames = Array.from(checkboxes).map(cb => cb.value);

  for (let i = 0; i < 4; i++) {
    const label = document.getElementById(`playerLabel${i}`);
    if (label) {
      label.textContent = selectedNames[i] || `Player ${String.fromCharCode(65 + i)}`;
    }
  }

  // モーダルを閉じる
  const modalElement = bootstrap.Modal.getInstance(document.getElementById('playerModal'));
  modalElement.hide();
}
