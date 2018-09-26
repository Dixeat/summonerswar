import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import store from './store';
import './App.css';

import Grid from '@material-ui/core/Grid';
import NavBar from './components/NavBar'
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';


const MonView = (props) => {
  let mon = props.mon;

  let spriteUrl = `https://swarfarm.com/static/herders/images/monsters/${mon.image_filename}`
  return (
    <Grid container spacing={16}>
      <Grid item>
        <ButtonBase className={mon.name}>
          {spriteUrl ? <img src={spriteUrl} alt="complex" /> : ''}
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={16}>
          <Grid item xs>
            <Typography gutterBottom variant="subheading">
              {mon.name}
            </Typography>
            <Typography gutterBottom>Element: {mon.element}</Typography>
            <Typography color="textSecondary">{mon.archetype}</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" size="small" color="primary" className={props.button}
              href={mon.resources['summonerswar.co']}>
              Summonerswar.co
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subheading">{mon.element}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const AppView = (props) => {
  return (
    <Fragment>
      <TextField style={{padding: 10}}
        id="searchInput"
        placeholder="Search for mons"   
        margin="normal"
        onInput={props.onInput}
        />
    </Fragment>
  );
};

class App extends Component {
  onInput = (evt) => {
    this.props.dispatchMonsterName(evt.target.value);
  }

  render() {
    return (
      <Fragment>
        <NavBar />
        <AppView onInput={this.onInput} />

          { this.props.fetchedMons ? (
            <Grid container spacing={24} style={{padding: 24}}>
              { this.props.fetchedMons.map(currentMon => (
                  <Grid item xs={12} sm={6} lg={4} xl={5}>
                      <MonView mon={currentMon}/>
                  </Grid>
              ))}
            </Grid>
          ) : "No monsters found" }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        // Get mons
        fetchedMons: state.monster.fetchedMons,
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
      dispatchMonsterName: (monsterName) => dispatch({type: 'ACTION_MONSTER_NAME', value: monsterName}),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
