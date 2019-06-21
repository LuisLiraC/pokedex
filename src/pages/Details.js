import React, {Component} from 'react';
import Loader from '../components/Loader';
import ErrorMSG from '../components/ErrorMSG';
import PokemonDetails from '../components/PokemonDetails';
import {Link} from 'react-router-dom';
import './styles/Details.css'
import '../components/styles/Loading.css';
import '../components/styles/ErrorMSG.css';

class Details extends Component {

    state = {
        loading: true,
        data: '',
        evolutionData: '',
        prevPokemon: '',
        nextPokemon: '',
        error: null
    }

    fetchPokemonData = async () => {
        try {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.pokemonName}`)
                               .then((response) => response.json());

            if(parseInt(data.id) > 1){
                var prevPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${parseInt(data.id) - 1}`)
                                        .then((response) => response.json());
            } else {
                prevPokemon = ''
            }

            if(parseInt(data.id) < 807){
                var nextPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${parseInt(data.id) + 1}`)
                                        .then((response) => response.json());
            } else {
                nextPokemon = ''
            }

            const evolution_chain_URL = await fetch(data.species.url)
                                        .then((response) => response.json())
                                        .then((response) => response.evolution_chain.url);

            const evolution_chain_data = await fetch(evolution_chain_URL)
                                         .then((response) => response.json());
            
            const EvolutionData = {
                Pokemon1: [],
                Pokemon2: [],
                Pokemon3: []
            }
            
            // Base Pokemon
            const PokemonData1 = evolution_chain_data.chain
            const firsEvolutionName = PokemonData1.species.name
            const firstEvolutionId = PokemonData1.species.url.substring(42, PokemonData1.species.url.length - 1)
            EvolutionData.Pokemon1.push({id: firstEvolutionId, name: firsEvolutionName})

            // Second Evolution(s)
            const PokemonData2 = PokemonData1.evolves_to
            if(PokemonData2.length > 0){
                PokemonData2.forEach(secondPokemon => {
                    const secondEvolutionName = secondPokemon.species.name
                    const secondEvolutionId = secondPokemon.species.url.substring(42, secondPokemon.species.url.length - 1)
                    EvolutionData.Pokemon2.push({id: secondEvolutionId, name: secondEvolutionName})

                    // Third Evolution(s)
                    const PokemonData3 = secondPokemon.evolves_to
                    if(PokemonData3.length > 0){
                        PokemonData3.forEach(thirdPokemon =>{
                            const thirdEvolutionName = thirdPokemon.species.name
                            const thirdEvolutionId = thirdPokemon.species.url.substring(42, thirdPokemon.species.url.length - 1)
                            EvolutionData.Pokemon3.push({id: thirdEvolutionId, name: thirdEvolutionName})
                        })
                    }
                });
            }

            this.setState({
                data: data,
                prevPokemon: prevPokemon,
                nextPokemon: nextPokemon,
                evolutionData: EvolutionData,
                loading: false
            })
        } catch (error) {
            this.setState({
                loading: false,
                error: true
            })
        }

    }

    render (){
        return (
            <React.Fragment>
                <div className="details__container">
                    <div className="Badges__buttons">
                        <Link to="/pokemon/search" className="btn btn-primary search">Search Pokemon</Link>
                        <Link to="/" className="btn btn-primary home">Home</Link>
                    </div>
                    {!this.state.loading && (
                        <PokemonDetails 
                            pokemon={this.state.data} 
                            prevPokemon={this.state.prevPokemon} 
                            nextPokemon={this.state.nextPokemon} 
                            evolutionData={this.state.evolutionData}
                        />
                    )}
                    {this.state.loading && (
                        <Loader />
                    )}
                    {this.state.error && (
                        <ErrorMSG />
                    )}
                </div>
            </React.Fragment>
        )
    }

    componentDidMount(){
        this.fetchPokemonData();
    }

    componentWillReceiveProps(nextProps){
        this.props = nextProps
        this.setState({
            loading: true
        })
        this.fetchPokemonData();
    }

}

export default Details;