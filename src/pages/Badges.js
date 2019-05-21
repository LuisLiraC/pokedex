import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BadgesList from '../components/BadgesList';
import PokeLogo from '../images/pokeLogo2.png';
import Loader from '../components/Loader';
import ErrorMSG from '../components/ErrorMSG';
import './styles/Badges.css';

class Badges extends Component {
    
    constructor(props){
        super(props)
        this.state = { 
            start: 0,
            loading: true,
            error: null,
            data: []
        }
    }

    render(){
        return (
            <React.Fragment>
                <div className="Badges">
                    <div className="Badges__hero">
                        <div className="Badges__container">
                            <img className="Badges_pokedex-logo" src={PokeLogo} alt="Pokedex Logo"/>
                        </div>
                    </div>
                </div>
                <div className="Badges__container">
                    <div className="Badges__buttons">
                        <Link to="/pokemon/search" className="btn btn-primary search">Search Pokemon</Link>
                    </div>
                    <div className="Badges__list">
                        <div className="Badges__container">
                            <BadgesList pokemons={this.state.data}/>
                        </div>
                    </div>
                    {this.state.loading && (
                        <Loader />
                    )}
                    {!this.state.loading && !this.state.error && (
                        <span className="btn more" onClick={this.fetchPokemon}>More</span>
                    )}
                    {this.state.error && (
                        <ErrorMSG />
                    )}
                </div>
            </React.Fragment>
        )
    }

    componentDidMount(){
        this.fetchPokemon()
    }

    fetchPokemon = async () => {
        this.setState({loading: true, error: null})

        try {

            const limit = 21;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${this.state.start}&limit=${limit}`);
            const pokemonList = await response.json();
        
            
            const Pokes = []
    
            for(var i = 0; i < pokemonList.results.length; i++){
                const Poke = await fetch(pokemonList.results[i].url).then((response) => response.json());   
                Pokes.push(Poke)
            }
    
            this.setState({
                start: this.state.start + limit,
                loading: false,
                data: [].concat(this.state.data, Pokes)
            })

        } catch (error) {
            this.setState({
                loading: false,
                error: error
            })
        }
    }

    componentDidUpdate(){

    }

    componentWillUnmount(){

    }
}

export default Badges;