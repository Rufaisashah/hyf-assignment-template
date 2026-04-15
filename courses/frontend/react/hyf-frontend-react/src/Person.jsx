

function Person(){
    const name = "John";
    const age = 25;
    
    return (
        <div>
            {age >= 18 ? `${name} is an adult` : `${name} is a minor`}
        </div>
    )
}

export default Person;