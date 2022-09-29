import {Component} from "react";
import "./bot.style.css"

 export class Bot extends Component{
    constructor(props){
        super(props)
        this.state={
            message:""
        }

        // Cet tableau ne sera pas modifier donc pas besoin de le mettre dans le state
        this.phraseOptions = [
            "You clicked me ",
            "Quit clicking me 😠",
            "Thank you for clicking me !",
            "Javascript is so much fun",
            "I love coding 💗",
            "Toast notifications for life",
          ];
    }

    randomMessage = ()=>{
        let randIndex = Math.floor(Math.random()*this.phraseOptions.length);
        let randomMessage = this.phraseOptions[randIndex];
        this.setState({message:randomMessage});
    }

    render(){
        if (this.state.message!=="") {
            setTimeout(()=>{
                this.setState({message:""});
            },2000)
        }
        return(<>
                <button onClick={this.randomMessage}>Click me</button>
                <div>{this.state.message}</div>
                </>);
        
    }
}