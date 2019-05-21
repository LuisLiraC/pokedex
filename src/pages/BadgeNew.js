import React, { Component } from 'react';
import './styles/BadgeNew.css';
import PikachuRunning from '../images/pikachu_running.gif';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';

class BadgeNew extends Component {
    
    state = {
        data: {
            id: 0,
            types: [
                {
                    type: {
                        name: "",
                }
                },
                {
                    type: {
                        name: "",
                    }
                }
            ]
        }
    };

    handleChange = async(e) => {
        const PokeID = e.target.value;
        if(PokeID > 0 && PokeID !== false){
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokeID}/`).then((response) => response.json());
            this.setState({
                data: data
            })
        }
    }

    render(){
        return (
            <React.Fragment>
                <div className="BadgeNew__hero">
                    <img className="img-fluid" src={PikachuRunning} alt="Logo" />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Badge pokemonName={this.state.data.name} 
                                   pokedexID={this.state.data.id} 
                                   primaryType={this.state.data.types[0].type.name}
                                   secondaryType={this.state.data.types.length > 1 ? this.state.data.types[1].type.name : ""}
                            />
                        </div>
                        <div className="col-6">
                            <BadgeForm pokemonName={this.state.data.name}
                                       primaryType={this.state.data.types[0].type.name}
                                       secondaryType={this.state.data.types.length > 1 ? this.state.data.types[1].type.name : ""}
                                       onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default BadgeNew;