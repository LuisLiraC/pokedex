import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './styles/BadgeForm.css';

class BadgeForm extends Component {

    handleChange = e => {

    }

    handleClick = e => {

    }

    handleSubmit = e => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Search Pokemon</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" type="text" name="pokemonName" readOnly value={this.props.pokemonName} />
                    </div>
                    <div className="form-group">
                        <label>Pokedex ID</label>
                        <input onChange={this.props.onChange} className="form-control" type="text" name="pokedexID"/>
                    </div>
                    <div className="form-group">
                        <label>Type 1:</label>
                        <input className="form-control" type="text" name="primaryType" readOnly value={this.props.primaryType} />
                    </div>
                    <div className="form-group">
                        <label>Type 2:</label>
                        <input className="form-control" type="text" name="secondaryType" readOnly value={this.props.secondaryType} />
                    </div>
                    <Link to="/" className="btn save">Back</Link>
                </form>
            </div>
        )
    }
}

export default BadgeForm;