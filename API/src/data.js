import { html,css,LitElement } from "lit";
// https://hp-api.onrender.com/api/characters
export class Data extends LitElement{
    static get properties(){
        return{
            data: {type: Array},
            allData:{type:Array}
        }
    }

    static get styles(){
        return css`
        .contenido{
            margin-top: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap:10px;
            padding: 30px 3S0px;
        }
        .personaje{
            background: linear-gradient(50deg, rgb(148, 169, 116), rgb(105, 161, 218));
            height: 390px;
            width: 230px;
            border-radius: 10px;
            text-align: center;
            padding-top: 20px;
            margin: 10px;
        }
        img{
            height: 170px;
            width: 150px;
        }
        h1{
            font-family: "Sansita Swashed", cursive;
            color: white;
        }
        label{
            color:white;
        }
        `;
    }

    constructor(){
        super();
        this.data = [];
        this.allData = [];
    }

    connectedCallback(){
        super.connectedCallback();
        fetch('https://hp-api.onrender.com/api/characters')
        .then(response => response.json())
        .then(data => {
            this.data = data;
            this.allData = data;
            this.requestUpdate();
        })
        .catch(error => console.error(error));
    }

    render(){
        return html`
            <h1> Personajes de Harry Potter </h1>
            <div class="busqueda">
                <input type:"text" placeholder="Escribe un nombre aqui"></input>
                <label>Filtro por casas:</label>
                <select @change=${this.filtradoCasas}>
                    <option>Gryffindor</option>
                    <option>Hufflepuff</option>
                    <option>Ravenclaw</option>
                    <option>Slytherin</option>
                </select>
                <button @click=${this.limpiar}>Limpiar filtros</button>
            </div>
            <div class="contenido">
                ${this.data.map(dato => html `
                <div class="personaje">
                <h3>${dato.name}</h3> 
                <img src=${dato.image || 'default.jpg'} style:>
                <p><strong>Casa: </strong>${dato.house}</p>
                <p><strong>Especie: </strong>${dato.species}</p>
                <p><strong>Genero: </strong>${dato.gender}</p>
                <p><strong>Esta vivo: </strong>${dato.alive}</p>
                </div>`)}
            </div>
        `;
    }

    filtradoCasas(event){
        this.data = this.allData.filter(casas =>
            casas.house === event.target.value)
    }
    limpiar(){
        this.data = this.allData;
    }
}
customElements.define('data-element',Data);