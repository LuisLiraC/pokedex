import React from 'react';
import {Link} from 'react-router-dom';
import Next from '../images/right-arrow.png';
import './styles/PokemonDetails.css';

export default function PokemonDetails(props) {
    const pokemon = props.pokemon;
    const prevPokemon = props.prevPokemon;
    const nextPokemon = props.nextPokemon;
    const evolutionData = props.evolutionData;

    const Evolutions =[]

    var i = 0;
    if(evolutionData.Pokemon3.length > 0){
        evolutionData.Pokemon3.forEach(Third => {
            evolutionData.Pokemon2.forEach(Second => {
                evolutionData.Pokemon1.forEach(First => {
                    
                    if(First.name === "wurmple" & i === 1){
                        Evolutions.push({
                            firstId: First.id,
                            firstName: First.name,
                            secondId: 268,
                            secondName: "cascoon",
                            thirdId: 269,
                            thirdName: "dustox"
                        })
                        return
                    } 
                    
                    if(First.name === "wurmple" & i === 0){
                        i++;
                    }

                    Evolutions.push({
                        firstId: First.id,
                        firstName: First.name,
                        secondId: Second.id,
                        secondName: Second.name,
                        thirdId: Third.id,
                        thirdName: Third.name
                    })

                })
            })
        });
    }

    if(evolutionData.Pokemon3.length < 1 && evolutionData.Pokemon2.length > 0){
        evolutionData.Pokemon2.forEach(Second => {
            evolutionData.Pokemon1.forEach(First => {
                Evolutions.push({
                    firstId: First.id,
                    firstName: First.name,
                    secondId: Second.id,
                    secondName: Second.name,
                })
            })
        })
    }

    if(evolutionData.Pokemon2.length < 1 && evolutionData.Pokemon1.length > 0){
        evolutionData.Pokemon1.forEach(First => {
            Evolutions.push({
                firstId: First.id,
                firstName: First.name,
            })
        })
    }

    console.log(Evolutions)
    return(
        <React.Fragment>

            {/* General Info */}

            <div className='row Pokemon__details'>
                <div className='col-3 Pokemon__header'>
                    <h2 className='Pokemon__name'>{pokemon.name}</h2>
                    <span>Pokedex ID #{pokemon.id}</span>
                    <span className='Pokemon__weight'><b>Weight:</b> {(parseInt(pokemon.weight) * 0.1).toFixed(1)} kg</span>
                    <span className='Pokemon__height'><b>Height:</b> {(parseInt(pokemon.height,) * 0.1).toFixed(1)} m</span>
                </div>
                <div className="col-1 Pokemon__types">
                    <h6><b>Type(s)</b></h6>
                    <div className="Pokemon__types-badges">
                        <img 
                            className='Pokemon__type' 
                            src={`https://www.serebii.net/pokedex-bw/type/${pokemon.types[0].type.name}.gif`} 
                            alt={pokemon.types[0].type.name}
                        />
                        {pokemon.types.length > 1 ?
                            <img className='Pokemon__type' 
                                src={`https://www.serebii.net/pokedex-bw/type/${pokemon.types[1].type.name}.gif`} 
                                alt={pokemon.types[1].type.name}
                            />
                            : ""
                        }
                    </div>
                </div>
                <div className='col-4 Pokemon__sprites-default'>
                    <h6><b>Normal</b></h6>
                    <div className='Pokemon__sprites-container'>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={`${pokemon.name} Normal Front`} />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png`} alt="" />
                    </div>
                </div>
                <div className='col-4 Pokemon__sprites-shiny'>
                    <h6><b>Shiny</b></h6>
                    <div className='Pokemon__sprites-container'>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`} alt={`${pokemon.name} Shiny Front`} />  
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokemon.id}.png`} alt="" />
                    </div>
                </div> 
            </div>

            {/* Pokemon Stats */}
            
            <div className="row Pokemon__stats">
                <div className="col-2 Pokemon__stats-speed">
                    <h6><b>{pokemon.stats[0].stat.name}</b></h6>
                    <p>{pokemon.stats[0].base_stat}</p>
                </div>
                <div className="col-2 Pokemon__stats-defense">
                    <h6><b>{pokemon.stats[3].stat.name}</b></h6>
                    <p>{pokemon.stats[3].base_stat}</p>
                </div>
                <div className="col-2 Pokemon__stats-attack">
                    <h6><b>{pokemon.stats[4].stat.name}</b></h6>
                    <p>{pokemon.stats[4].base_stat}</p>
                </div>
                <div className="col-2 Pokemon__stats-hp">
                    <h6><b>{pokemon.stats[5].stat.name}</b></h6>
                    <p>{pokemon.stats[5].base_stat}</p>
                </div>
                <div className="col-2 Pokemon__stats-special_defense">
                    <h6><b>{pokemon.stats[1].stat.name}</b></h6>
                    <p>{pokemon.stats[1].base_stat}</p>
                </div>
                <div className="col-2 Pokemon__stats-special_attack">
                    <h6><b>{pokemon.stats[2].stat.name}</b></h6>
                    <p>{pokemon.stats[2].base_stat}</p>
                </div>
            </div>

            {/* Evolutions */}
            {evolutionData.Pokemon3.length > 0 && Evolutions.map((Ev)=> {
                return (
                    <div className="Evolution_chain">
                        <Link to={{pathname: `/pokemon/${Ev.firstName}`}} className="Evolution_chain_link">
                            <div className="Evolution_chain_first">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Ev.firstId}.png`} alt={`${Ev.firstName} Normal Front`} />
                                <p className="Evolution_chain_first_name">{Ev.firstName}</p>
                            </div>
                        </Link>

                        <img src={Next} alt="Next" className="Next" />

                        <Link to={{pathname: `/pokemon/${Ev.secondName}`}} className="Evolution_chain_link">
                            <div className="Evolution_chain_first">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Ev.secondId}.png`} alt={`${Ev.secondName} Normal Front`} />
                                <p className="Evolution_chain_first_name">{Ev.secondName}</p>
                            </div>
                        </Link>

                        <img src={Next} alt="Next" className="Next" />

                        <Link to={{pathname: `/pokemon/${Ev.thirdName}`}} className="Evolution_chain_link">
                            <div className="Evolution_chain_first">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Ev.thirdId}.png`} alt={`${Ev.thirdName} Normal Front`} />
                                <p className="Evolution_chain_first_name">{Ev.thirdName}</p>
                            </div>
                        </Link>
                    </div>
                )
            })}

            {evolutionData.Pokemon2.length > 0 && evolutionData.Pokemon3.length < 1 && Evolutions.map((Ev)=> {
                return (
                    <div className="Evolution_chain">
                        <Link to={{pathname: `/pokemon/${Ev.firstName}`}} className="Evolution_chain_link">
                            <div className="Evolution_chain_first">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Ev.firstId}.png`} alt={`${Ev.firstName} Normal Front`} />
                                <p className="Evolution_chain_first_name">{Ev.firstName}</p>
                            </div>
                        </Link>

                        <img src={Next} alt="Next" className="Next" />

                        <Link to={{pathname: `/pokemon/${Ev.secondName}`}} className="Evolution_chain_link">
                            <div className="Evolution_chain_first">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Ev.secondId}.png`} alt={`${Ev.secondName} Normal Front`} />
                                <p className="Evolution_chain_first_name">{Ev.secondName}</p>
                            </div>
                        </Link>
                    </div>
                )
            })}

            {evolutionData.Pokemon1.length > 0 && evolutionData.Pokemon2.length < 1 && Evolutions.map((Ev)=> {
                return (
                    <div className="Evolution_chain">
                        <Link to={{pathname: `/pokemon/${Ev.firstName}`}} className="Evolution_chain_link">
                            <div className="Evolution_chain_first">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Ev.firstId}.png`} alt={`${Ev.firstName} Normal Front`} />
                                <p className="Evolution_chain_first_name">{Ev.firstName}</p>
                            </div>
                        </Link>
                    </div>
                )
            })}

            {/* Previous and Next Pokemon */}
            
            <div className="Pokemon__Navigate">
                    {prevPokemon.id && (
                        <Link to={{pathname: `/pokemon/${prevPokemon.name}`, state: prevPokemon}}  className="Pokemon__Navigate-prev">
                            <div className="Pokemon__Navigate-prev">
                                <p>{'<'} &nbsp; #{prevPokemon.id}</p>
                                &nbsp;
                                &nbsp;
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${prevPokemon.id}.png`} alt={`${prevPokemon.name} Normal Front`} />
                            </div>
                        </Link>
                    )}

                    {nextPokemon.id && (
                        <Link to={{pathname: `/pokemon/${nextPokemon.name}`, state: nextPokemon}} className="Pokemon__Navigate-next">
                            <div className="Pokemon__Navigate-next">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextPokemon.id}.png`} alt={`${nextPokemon.name} Normal Front`} />
                                &nbsp;
                                &nbsp;
                                <p>#{nextPokemon.id} &nbsp; {'>'}</p>
                            </div>
                        </Link>
                    )}

            </div>
        </React.Fragment>
    )
}