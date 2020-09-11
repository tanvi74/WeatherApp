import React from 'react';
import './App.css';
import axios from "axios";
import Header from "./components/Header";
import Modal from './components/Modal'

class App extends React.Component {
  constructor(){
    super();
    this.state={
      temp:"",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
      isRaining: ""
    }
  }
  componentDidMount(){
    this.getCityWeather('London');
  }

  componentDidUpdate(prevProps,prevState,snapshot){
    console.log(prevState);
    if(this.state.weather !== prevState.weather){
      const isRaining = this.state.weather.includes('rain');
      if(isRaining){
          this.setState({
            isRaining: "Rain Rain go Away!!!"
          })
      }
    }
  
  }

  searchCity = (e) => {
    e.preventDefault();
    const city = document.getElementById("city").value;
    console.log(city);
    this.getCityWeather(city);
  }

  getCityWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`;

    axios.get(url).then((resp)=>{
      this.setState({
        temp: resp.data.main.temp,
        high: resp.data.main.temp_max,
        low: resp.data.main.temp_min,
        weather: resp.data.weather[0].description,
        icon: resp.data.weather[0].icon,
        cityName: resp.data.name
      })
    })
  }

  render(){
    const iconUrl = `http://openweathermap.org/img/w/${this.state.icon}.png`
    return (
      <div className="App">
        <div className="row"> 
          <div className="col s6 offset-s3">
              <Header temp={this.state.temp}  isRaining={this.state.isRaining}/>
              <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Details</a>
              <form onSubmit={this.searchCity}>
                <input type="text" id="city" placeholder = "enter a city name" />
              </form>
          </div>
        </div>
       <Modal iconUrl={iconUrl} high={this.state.high} low={this.state.low} weather={this.state.weather} cityName={this.state.cityName}/>
        
      </div>
    );
  }
}

export default App;
