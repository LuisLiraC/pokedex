import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './styles/BadgesList.css';

class BadgesList extends Component {

    render(){
        return(
            <ul className="list-unstyled">
                {this.props.pokemons.map((pokemon) => {
                    return (
                        <li className="list__element" key={pokemon.id}  >
                            <div className="list__element-content">
                                <img className="pokemonAvatar" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/` + pokemon.id + `.png`} alt="Pokemon IMG" />
                                <div className="list__element-content-info">
                                    <h3>{pokemon.name}</h3>
                                    <p><b>Pokedex ID:</b> #{pokemon.id}</p>
                                    <div className="pokemonTypes">
                                        <img 
                                            className='pokemonType' 
                                            src={`https://www.serebii.net/pokedex-bw/type/${pokemon.types[0].type.name}.gif`} 
                                            alt={pokemon.types[0].type.name}
                                        />
                                        {pokemon.types.length > 1 ?
                                            <img className='pokemonType' 
                                                src={`https://www.serebii.net/pokedex-bw/type/${pokemon.types[1].type.name}.gif`} 
                                                alt={pokemon.types[1].type.name}
                                            />
                                            : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            <Link to={`/pokemon/${pokemon.name}`} className="btn details">Details</Link>
                        </li>
                    )
                })}
            </ul>
        )
    }

}

export default BadgesList;