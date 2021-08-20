import React, { Component} from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import {Table} from 'react-bootstrap'

const pokemonFormSchema = Yup.object().shape({
    "pokemon_name": Yup.string().required()
})

const pokemonFormInitialValue={
    pokemon_name:'',
}

export default class Pokemon extends Component {
    
    constructor(){
        super();
        this.state={
            pokemon:[],
            badRound:false
        }
    }

    handleSubmit=({pokemon_name})=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`)
            .then(res=>res.json())
            .then(data=>{
                    this.setState({
                        pokemonName: data.forms[0].name,
                        pokemonAbilities: data.abilities[0].ability.name,
                        pokemonBaseExperience: data.base_experience,
                        pokemonSpriteUrl: data.sprites.front_shiny,
                        badRound:false

                    }, ()=>console.log (this.state.pokemonName))
            })
            .catch(error=>{this.setState({badRound:true}); console.error(error); })
    }

    render() {
        return(
            <div>
                <h1>Search A Pokemon </h1>
                
                {this.state.badRound ? <small style = {{color:"red"}}>Invalid Pokemon</small>:""}
                <Formik initialValues={pokemonFormInitialValue}
                        validationSchema={pokemonFormSchema}
                        onSubmit={(values,{resetForm})=>{
                            this.handleSubmit(values);
                            resetForm(pokemonFormInitialValue)
                            
                        }}
                        >
                        {({errors, touched })=>(
                            <Form>
                                <label htmlFor="pokemon_name" className="form-label">Pokemon Name</label>
                                <Field name= "pokemon_name" className = "form-control"/>
                                {errors.pokemon_name && touched.pokemon_name ? (<div style={{color:'red'}}>{errors.pokemon_name}</div>):null}
        
                                <button type="Submit" className="btn btn-primary btn-block">Submit</button>
        
                            </Form>
                        )
                            
                        }
                        </Formik>
                        {/*racer table here */}
                        {this.state.pokemonName?
                       <> 
                            <img src = {this.state.pokemonSpriteUrl} alt="pokemon image"/>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Ability</th>
                                        <th>Base Experience</th>
                                        <th>Sprite URL</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>{this.state.pokemonName}</td>
                                        <td>{this.state.pokemonAbilities}</td>
                                        <td>{this.state.pokemonBaseExperience}</td>
                                        <td>{this.state.pokemonSpriteUrl}</td>
                                        
                                    </tr>
                        
                                </tbody>
                            </Table>
                        </>
                        :''}
                    </div>
                )
            }



}