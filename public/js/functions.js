let idx;

        function getJoke(event) {
            fetch('/jokes')
                .then(res => res.json())
                .then(data => {
                    let studentsHTML = '';
                    idx = Math.floor(Math.random() * data.length);
                    let {avg} = data[idx].reactions;
                    if(avg == undefined) {avg = 0};
                    document.getElementById('avg').innerText = avg;

                    studentsHTML += `<img src=${data[idx].img}>`;
                    const root = document.getElementById('root');
                    root.innerHTML = studentsHTML;
                })
        }

        function sendReaction(reaction) {
            console.log(reaction)

            fetch('/reaction', {
                method: 'POST',
                body: JSON.stringify({ reaction, index: idx }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    const { avg } = data;
                    console.log(avg);
                    document.getElementById('avg').innerText = avg.toFixed(2)
                })
        }