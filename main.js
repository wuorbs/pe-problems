let options = document.querySelectorAll('.option div');
let optionBox = document.querySelector('.optionBox');

options.forEach(function(option){
    option.addEventListener('click',function(){
        optionBox.value = this.innerText;
    })
})

let dropdown = document.querySelector('.dropdown');

dropdown.addEventListener('click',function(){
    dropdown.classList.toggle('active');
})

let form = document.querySelector('form');
let searchBox = document.querySelector('.searchBox');
let cardContainer = document.querySelector('.cardContainer');
let title = document.querySelector('.title');

form.addEventListener('submit',function(event){
    event.preventDefault();

    let apiUrl = 'https://services.rosemoe.cyou/api/problem_bank/query?problem_set='+encodeURIComponent(optionBox.value)+'&content_query='+encodeURIComponent(searchBox.value);
    let xhr = new XMLHttpRequest();

    xhr.open('GET',apiUrl,true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                let response = JSON.parse(xhr.responseText);
                if(response.success === true){
                    cardContainer.innerHTML = '';
                    cardContainer.style.display = 'none';
                    if(window.innerWidth < 900) {
                        form.style.top = '150px';
                        title.style.top = '100px';
                    }
                    else {
                        form.style.top = '350px';
                        title.style.top = '300px';
                    }
                
                    if(response.results.length > 0){
                        if(window.innerWidth < 900) {
                            form.style.top = '50px';
                            title.style.top = '20px';
                        }
                        else {
                            form.style.top = '150px';
                            title.style.top = '120px';
                        }
                        cardContainer.style.display = 'block';

                        response.results.forEach(function(result){
                            let card = document.createElement('div');
                            card.classList.add('card');

                            let content = document.createElement('div');
                            content.classList.add('content');
                            content.textContent = result.content;

                            let optionsList = document.createElement('div');
                            optionsList.classList.add('optionsList');

                            result.options.forEach(function(option){
                                let optionItem = document.createElement('div');
                                optionItem.textContent = option.name + '. ' + option.content;

                                optionsList.appendChild(optionItem);
                            })

                            let answer = document.createElement('div');
                            answer.classList.add('answer');
                            answer.textContent = '答案：' + result.answer;

                            let line = document.createElement('div');
                            line.classList.add('line');

                            card.appendChild(content);
                            card.appendChild(line.cloneNode(true));
                            card.appendChild(optionsList);
                            card.appendChild(line.cloneNode(true));
                            card.appendChild(answer);
                            cardContainer.appendChild(card);
                        })
                    }
                    else alert('没有找到相关的题目！');
                }
                else if(response.message === 'forbidden: keyword should be at least 2 characters') alert('题目或关键词至少为2个字符！');
                else if(response.message === 'forbidden: keyword can not contain brackets') alert('题目或关键词不能包含括号！');
            }
            else alert('API请求失败！请联系QQ1509055800');
        }
    }

    xhr.send();
})