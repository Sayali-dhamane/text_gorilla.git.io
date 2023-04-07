
function setComment(){

    let cmt=document.getElementById('section')

    for(let i=0;i<comment.length;i++){
        username=comment[i].user.username
        image=comment[i].user.image.png
        content=comment[i].content
        lastseen=comment[i].createdAt
        replies=comment[i].replies
        score=comment[i].score
        // console.log(comment[i].replies)
        if(comment[i].user.username==currentUser.username){
            cmt.innerHTML = cmt.innerHTML+getcomment(image,username,lastseen,content,score,'',"",
                `<span style="color:red" class="h3" onclick="deletes(${i},${undefined})"  >Delete</span>&nbsp;&nbsp; <span style="color:blue" class="h3" onclick="edit(${i},${undefined})">Edit</span>&nbsp;&nbsp;`
                )
        }else{
            cmt.innerHTML = cmt.innerHTML+getcomment(image,username,lastseen,content,score,'',"",'')
        
        }
        
        
        for(let j=0;j<replies.length;j++){
            // console.log(replies[j])
            username=replies[j].user.username
            image=replies[j].user.image.png
            content=replies[j].content
            lastseen=replies[j].createdAt
            score=replies[j].score
            // console.log(replies[j].replyingTo)
            replyedto=replies[j].replyingTo
            // console.log()
            if(replies[j].user.username==currentUser.username){
                cmt.innerHTML = cmt.innerHTML+getcomment(image,username,lastseen,content,score,replyedto,"margin-left:100px",
                    `<span style="color:red" class="h3" onclick="deletes(${i},${j})"  >Delete</span>&nbsp;&nbsp; <span style="color:blue" class="h3" onclick="edit(${i},${j})">Edit</span>&nbsp;&nbsp;`
                    )
            }else{
                cmt.innerHTML = cmt.innerHTML+getcomment(image,username,lastseen,content,score,replyedto,"margin-left:100px",'')
            
            }
        }
    }

}


let comment;
let currentUser;
fetch('data.json').then((json)=>{
    return json.json()
}).then((json)=>{
    comment=json.comments;
    currentUser=json.currentUser;
    // console.log(comment,currentUser)
    setComment()
})


function deletes(i,j){

    if(j!=undefined){
    let ans =prompt('Do you really want to delete your reply ??')
  
  if(ans=='yes'|| ans=='y' || ans=='Yes' || ans=='YES' || ans=='Y' || ans=='ha'){
    comment[i].replies.splice(j,1);
  }
  
}else{
    let ans =prompt('Do you really want to delete your comment ??')
  
  if(ans=='yes'|| ans=='y' || ans=='Yes' || ans=='YES' || ans=='Y' || ans=='ha'){
    comment.splice(i,1)
  }
    
  }
//   console.log(comment)
  let cmt=document.getElementById('section').innerHTML='';
  setComment()


}

function edit(i,j){

    if(j!=undefined){
        let newComments = prompt('please Enter new Comment',comment[i].replies[j].content)
    comment[i].replies[j].content =newComments;
    }else{
        let newComments = prompt('please Enter new Comment',comment[i].content)
    comment[i].content =newComments;
    }

    let cmt=document.getElementById('section').innerHTML='';
    setComment()
}


function addreply(){
    let reply=document.getElementById('reply').value;
        let com = {
            content:reply,
            user:{username:currentUser.username,image:{png:currentUser.image.png}},
            createdAt:'1 min ago',
            replies:[],
            score:9
        };
        comment.push(com)
        console.log(comment[0])
        let cmt=document.getElementById('section').innerHTML='';
        setComment();
}


function getcomment(imgsrc,name,lastseen,coment, Score,reply,margin,elem){
    return `<div style=${margin}> <div class="container-fluid bg-white rounded p-3 m-2 " style="display: flex;">               
    <div class="card text-center" style="width: 60px;background-color: aliceblue;height: 120px;">
        <p>+</p>
        <p>${Score}</p>
        <p>-</p>
    </div>

    <div class="p-3 w-100">

        <span style="display: flex;justify-content: space-between;width: 100%;"> 
            <div style="display: flex;justify-content: space-between;width: 35%;">
                <img src="${imgsrc}" class="rounded-pill bg-secondary " style="width: 50px;height: 50px;background-color: grey;">
                <h3>${name}</h3>
                <p class="text-secondary mt-2">${lastseen}</p></div>
                 <span style="display:flex;"><i><h3>${elem!=''? `${elem}`:'Reply'}</h3></i></span>
        </span>
        <b class="text-primary">${reply?'@':''}${reply} </b>${coment}

    </div>


</div> </div>`
}