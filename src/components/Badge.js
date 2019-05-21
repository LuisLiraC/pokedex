import React, { Component } from 'react';
import pokemonLogo from '../images/Pokemon_logo.svg'
import './styles/Badge.css';

class Badge extends Component {
    render() {
        return (
            <div className="Badge">
                <div className="Badge__header">
                    <img src={pokemonLogo} alt="Logo" />
                </div>

                <div className="Badge__section-name">
                    <img className="Badge__avatar" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/` + this.props.pokedexID + `.png`} alt="Avatar" />
                    <div>
                        <h3 className="Badge__ID">#{this.props.pokedexID}</h3>
                        <h1 className="Badge__Name">{this.props.pokemonName}</h1>
                    </div>
                </div>

                <div className="Badge__section-info">
                    <h6><b>Type 1:</b> {this.props.primaryType}</h6>
                    <h6><b>Type 2:</b> {this.props.secondaryType}</h6>
                </div>
                
                <div className="Badge__footer">
                    <p>#PokeManiac</p>
                </div>
            </div>
        )
    }
} 

export default Badge;