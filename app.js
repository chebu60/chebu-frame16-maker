'use strict';
const $=id=>document.getElementById(id);
let imageUrl='';
const val=id=>$(id).value.trim();
function textOr(value,fallback){return value||fallback}
$('chooseImage').onclick=()=>$('imageInput').click();
$('imageInput').onchange=e=>{const file=e.target.files[0];if(!file)return;if(imageUrl)URL.revokeObjectURL(imageUrl);imageUrl=URL.createObjectURL(file);$('imagePreview').src=imageUrl;$('imageSelected').hidden=false;};
$('background').onchange=()=>{$('backgroundOtherWrap').hidden=$('background').value!=='指定の背景'};
function makePrompt(){
 const name=textOr(val('character'),'アップロードしたキャラクター');
 const motion=textOr(val('motion'),'連続した自然な動き');
 const bg=$('background').value==='指定の背景'?textOr(val('backgroundOther'),'指定された背景'):$('background').value;
 const style=textOr(val('style'),'元画像の見た目を忠実に保つ、自然で見やすい表現');
 const keep=textOr(val('keep'),'キャラクターの顔、体型、服装、色、素材感、カメラ位置、キャラクターの大きさを全コマで固定');
 const avoid=textOr(val('avoid'),'文字、数字、説明ラベル、別のキャラクター、不要な小物、服装や顔の変更、不自然な手足、各コマでの大きさや位置のばらつき');
 return `アップロードした参考画像の${name}を使って、正方形キャンバスに、4列×4行＝16コマの連続ポーズ画像を1枚だけ作成してください。\n\n【最重要】\n各マスには、キャラクター全体が必ず1体ずつ入るようにしてください。16コマを1体の大きなキャラクターとして描かないでください。各マスのキャラクターの大きさ、足元の位置、カメラの距離、向きをできるだけそろえてください。\n\n【はみ出し防止】\n16コマの中で、手足・髪・帽子・耳・衣装・持ち物などが最も大きく広がるポーズを基準に、全コマのキャラクターを同じ縮尺で少し小さめに配置してください。各マスの上下左右に十分な安全余白を確保し、キャラクターの全身とすべての部分をマスの内側に完全に収めてください。頭、髪、手、足、衣装、持ち物がマスの境界線に触れたり、隣のマスへはみ出したりしないようにしてください。動きが小さいコマだけを大きく描かず、16コマすべてで同じ縮尺を維持してください。\n\n【動き】\n左上の1コマ目から右へ進み、4コマ目の次は2段目左へ、最後は右下の16コマ目へ進みます。${motion}。最初のポーズから最後のポーズまで、ひと続きの動作として少しずつ変化させてください。似たポーズの繰り返しにせず、動きがなめらかにつながる16段階にしてください。\n\n【見た目】\n背景は${bg}。${style}。${keep}。\n\n【画面の作り】\n各マスを均等な4×4グリッドにし、マスとマスの間には細い余白を入れてください。余白はキャラクターに重ならないようにしてください。説明文字やコマ番号は入れません。\n\n【ネガティブプロンプト】\n${avoid}、1枚の大きなキャラクターを16分割した画像、キャラクターやその一部がマスの境界線に触れること、隣のマスへのはみ出し、頭・髪・手・足・衣装・持ち物の切れ、コマごとの縮尺変更、頭だけ・体だけのコマ、コマ数不足、5列以上または3列以下のグリッド、不均一なマス、余白なし、透かし`;
}
$('make').onclick=()=>{$('prompt').value=makePrompt();$('result').hidden=false;$('result').scrollIntoView({behavior:'smooth',block:'start'});};
$('copyPrompt').onclick=async()=>{const button=$('copyPrompt');try{await navigator.clipboard.writeText($('prompt').value);button.textContent='コピーしました';setTimeout(()=>button.textContent='完成版をコピー',1600)}catch{ $('prompt').focus();$('prompt').select();document.execCommand('copy');button.textContent='コピーしました';setTimeout(()=>button.textContent='完成版をコピー',1600)}};
