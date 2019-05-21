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
        evolution_data: {
            first_pokemon_name: '',
            first_pokemon_id: '',
            second_pokemon_name: '',
            second_pokemon_id: '',
            second_pokemon_variant_name: '',
            second_pokemon_variant_id: '',
            third_pokemon_name: '',
            third_pokemon_id: '',
            third_pokemon_variant_name: '',
            third_pokemon_variant_id: ''
        },
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
            
            // Initial Pokemon: Pichu / Eevee / Wurmple
            const first_pokemon_name = evolution_chain_data.chain.species.name
            const first_pokemon_id = evolution_chain_data.chain.species.url.substring(42, evolution_chain_data.chain.species.url.length - 1)

            // Second Pokemon: Pikachu / Vaporeon / Silcoon
            if(evolution_chain_data.chain.evolves_to.length > 0){
                var second_pokemon_name = evolution_chain_data.chain.evolves_to[0].species.name
                var second_pokemon_id = evolution_chain_data.chain.evolves_to[0].species.url.substring(42, evolution_chain_data.chain.evolves_to[0].species.url.length - 1)

                // Second Pokemon 2: Jolteon / Cascoon
                if(evolution_chain_data.chain.evolves_to.length > 1){
                    var second_pokemon_variant_name = evolution_chain_data.chain.evolves_to[1].species.name
                    var second_pokemon_variant_id = evolution_chain_data.chain.evolves_to[1].species.url.substring(42, evolution_chain_data.chain.evolves_to[0].species.url.length - 1)
                } else {
                    second_pokemon_variant_name = ""
                    second_pokemon_variant_id = ""
                }
                

                // Third Pokemon: Raichu / Viplume
                if(evolution_chain_data.chain.evolves_to[0].evolves_to.length > 0){
                    var third_pokemon_name = evolution_chain_data.chain.evolves_to[0].evolves_to[0].species.name
                    var third_pokemon_id = evolution_chain_data.chain.evolves_to[0].evolves_to[0].species.url.substring(42, evolution_chain_data.chain.evolves_to[0].evolves_to[0].species.url.length - 1)

                    // Third Pokemon 2: Politoed
                    if(evolution_chain_data.chain.evolves_to[0].evolves_to.length > 1){
                        var third_pokemon_variant_name = evolution_chain_data.chain.evolves_to[0].evolves_to[1].species.name
                        var third_pokemon_variant_id = evolution_chain_data.chain.evolves_to[0].evolves_to[1].species.url.substring(42, evolution_chain_data.chain.evolves_to[0].evolves_to[1].species.url.length - 1)
                    } else {
                        third_pokemon_variant_name = ""
                        third_pokemon_variant_id = ""
                    }
                } else {
                    third_pokemon_name = ""
                    third_pokemon_id = ""
                }
                
            } else {
                second_pokemon_name = ""
                second_pokemon_id = ""
            }


            this.setState({
                data: data,
                prevPokemon: prevPokemon,
                nextPokemon: nextPokemon,
                evolution_data: {
                    first_pokemon_name: first_pokemon_name,
                    first_pokemon_id: first_pokemon_id,
                    second_pokemon_name: second_pokemon_name,
                    second_pokemon_id: second_pokemon_id,
                    second_pokemon_variant_name: second_pokemon_variant_name,
                    second_pokemon_variant_id: second_pokemon_variant_id,
                    third_pokemon_name: third_pokemon_name,
                    third_pokemon_id: third_pokemon_id,
                    third_pokemon_variant_name: third_pokemon_variant_name,
                    third_pokemon_variant_id: third_pokemon_variant_id
                },
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
                            evolution_data={this.state.evolution_data}
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