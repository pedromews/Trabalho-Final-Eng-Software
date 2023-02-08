class Favor {
    constructor() {
        this.favorArray = [];

        let favor1 = {};
        let favor2 = {};
        let favor3 = {};

        favor1.author = 'pedromews';
        favor1.title ='Lorem ipsum dolor sit amet, consectetur adipiscing elit';
        favor1.type = 'Favor request';
        favor1.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis auctor eros, eget mollis est ultricies ut. Suspendisse feugiat laoreet felis ac dictum. Nulla non malesuada leo, eget luctus est. Ut at velit tellus. Fusce pretium viverra enim, vitae tincidunt magna. Nam quis placerat massa,...';
        favor1.price = '300';
        this.favorArray.push(favor1);

        favor2.author = 'pasta';
        favor2.title ='IN DUI PURUS, MOLLIS ET SAGITTIS EU, PELLENTESQUE ET ERAT!';
        favor2.type = 'Favor offer';
        favor2.description = 'Sed justo felis, eleifend non eleifend ut, egestas ut dolor. Maecenas ut rhoncus arcu. Sed feugiat magna vitae sem luctus feugiat. Cras ultricies auctor dui, egestas interdum dolor ultricies sed. Proin fringilla, tellus ut viverra eleifend, ipsum tortor egestas diam.';
        favor2.price = '650';
        this.favorArray.push(favor2);

        favor3.author = 'tonitodos_informatica';
        favor3.title ='Ofereço serviços de informática';
        favor3.type = 'Favor offer';
        favor3.description = 'TONITODOS INFORMÁTICA:\nOfereço serviços de informática, como formatação e backups, manutenção preventiva, limpeza interna e externa, remoção de vírus, configuraç...';
        favor3.price = '1';
        this.favorArray.push(favor3);
    }

    publish() {
        let favor = this.readData();

        if (this.validateFields(favor)) {
            this.add(favor);
        }

        this.listTable();
        this.cancel();
    }

    listTable() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.favorArray.length; i++) {
            let tr = tbody.insertRow();
            
            let td_author = tr.insertCell();
            let td_title = tr.insertCell();
            let td_type = tr.insertCell();
            let td_description = tr.insertCell();
            let td_price = tr.insertCell();
            let td_actions = tr.insertCell();

            td_author.innerText = this.favorArray[i].author;
            td_title.innerText = this.favorArray[i].title;
            td_type.innerText = this.favorArray[i].type;
            td_description.innerText = this.favorArray[i].description;
            td_price.innerText = this.favorArray[i].price;

            let imgOfferFavor = document.createElement('img');
            imgOfferFavor.src = 'img/39bd7313-448e-42c0-aaa1-11fdfceac428.png';
            
            let imgRequestFavor = document.createElement('img');
            imgRequestFavor.src = 'img/fcbae641-321c-41c8-8691-44c152fd59b5.png';

            let imgReport = document.createElement('img');
            imgReport.src = 'img/f25fd32a-813d-4521-90dd-937c5a2942fb.png';

            if (this.favorArray[i].type == 'Favor request') {
                td_actions.appendChild(imgOfferFavor);
            }
            else if (this.favorArray[i].type == 'Favor offer') {
                td_actions.appendChild(imgRequestFavor);
            }
            
            td_actions.appendChild(imgReport);
        }
    }

    add(favor) {
        this.favorArray.push(favor);
    }

    readData() {
        let favor = {}

        favor.author = document.getElementById('author').value;
        favor.title = document.getElementById('title').value;
        favor.description = document.getElementById('description').value;
        favor.price = document.getElementById('price').value;
        
        let i = 0;
        let radios = document.getElementsByName('type');
        favor.type = '';
        while (i < radios.length && !radios[i].checked) {
            i++;
        }
        if (i < radios.length) {
            favor.type = radios[i].value;
        }

        return favor;
    }

    validateFields(favor) {
        let msg = '';

        if (favor.author == '') {
            msg += '- Inform favor\'s author\'s name\n';
        }

        if (favor.title == '') {
            msg += '- Inform favor\'s title\n';
        }

        if (favor.type == '') {
            msg += '- Inform favor\'s type\n';
        }

        if (favor.description == '') {
            msg += '- Inform favor\'s description\n';
        }

        if (favor.price == '') {
            msg += '- Inform favor\'s price\n';
        }

        if (msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    cancel() {
        document.getElementById('author').value = '';
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('price').value = '';

        let radios = document.getElementsByName('type');
        for (let i = 0; i < radios.length; i++)
            radios[i].checked = false;
    }
}

var favor = new Favor();