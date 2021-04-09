import React, { Component } from 'react'

export default class Supplement extends Component {

    constructor(props){
          super(props);

          this.state={

            supplement:[],
            searchedFood:[],
            presentFood:
            {
                 name:"",
                 calories:0,
                 protiens:0,
                 carbs:0,
                 fats:0,
                 fibre:0,
                 sugar:0,
                 weight:"",

           }
          }

    }

selectedFood(item){
this.setState({presentFood:item});

}

calculateValues(weight){

 let nowFood = this.state.presentFood;

 if(weight!=="" && weight!==0)
 {


    nowFood.calories = Number((nowFood.calories*weight)/nowFood.weight);
    nowFood.protiens = Number((nowFood.protiens*weight)/nowFood.weight);
    nowFood.carbs = Number((nowFood.carbs*weight)/nowFood.weight);
    nowFood.fats = Number((nowFood.fats*weight)/nowFood.weight);
    nowFood.fibre = Number((nowFood.fibre*weight)/nowFood.weight);
    nowFood.sugar = Number((nowFood.sugar*weight)/nowFood.weight);
    nowFood.weight = Number(weight);
    this.setState({presentFood:nowFood});

 }



}




searchFood(value){
if(value!=="")
{
    let searchFoods = this.state.supplement.filter((item,index)=>{
        return item.name.toLowerCase().includes(value.toLowerCase());
    })

    this.setState({searchedFood:searchFoods});

}
else{
    this.setState({searchedFood:[]})
}
}



    

    
    componentDidMount() {

        fetch("http://localhost:8000/food")
        .then((result => result.json()))
         .then((result) =>{

            this.setState({supplement:result.food_item});
         })
         .catch((err)=> {

            console.log(err);
         }) 

       }
    
    
    
    render() {

        return (
            <div className="container">
            <div className="hd"><h1>Nutrition Table</h1></div>
                <div className="form-group" style = {{marginTop:"50px"}}>
                  <input className="form-control" onChange={(event)=>{
                  this.searchFood(event.target.value)

                  }} placeholder="Search Eatables"/>
                </div>
                <div className="search-data">
                {
                    this.state.searchedFood.map((item,index) =>(
                     

                        <div className="data" style = {{cursor:'pointer',padding:'5px'}}  onClick={()=>{
                  this.selectedFood(item);

                        }}key={index}>
                         
                        {item.name}
                       </div>

                    ))
                }
                   
                </div>

                <div className="item-result">
                   <table className="tb">
                       <thead >
                            <tr>
                              <th>Name</th>
                              <th>Calories</th>
                              <th>Protiens</th>
                              <th>Carbs</th>
                              <th>Fats</th>
                              <th>Fibre</th>
                              <th>Sugar</th>
                              <th>Weight</th> 
                            </tr>                
                       </thead>

                     <tbody>

                          <tr>
                            <td>{this.state.presentFood.name}</td>
                            <td>{this.state.presentFood.calories.toFixed(2)  }</td>
                            <td>{this.state.presentFood.protiens.toFixed(2)}</td>
                            <td>{this.state.presentFood.carbs.toFixed(2)}</td>
                            <td>{this.state.presentFood.fibre.toFixed(2)}</td>
                            <td>{this.state.presentFood.fats.toFixed(2)}</td>
                            <td>{this.state.presentFood.sugar.toFixed(2)}</td>


                            <td>
                            
                            <input type="number" placeholder="100 gram (default)" defaultValue={this.state.presentFood.weight} onChange={(event)=>
                             { this.calculateValues(Number(event.target.value));
                             }
                            
                            }/>
                              
                                           
                              </td>
                           </tr>                                 
                     </tbody>
                                    
                   </table>                
                </div>
            </div>
        )
    }
}
