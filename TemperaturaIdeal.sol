// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TemperaturaIdeal{

    uint public temperatura;
    address sensor;
    address termostato;
    
    event Instruction(address device, string instruction);
    event reward(address device, string instruction);
    
    function IoT(address _sensor, address _termostato) public {
        sensor = _sensor;
        termostato=_termostato;
    }
    
    function atualizaTemperatura (uint _temperatura) public {
        if(msg.sender != sensor) revert();
        
        temperatura = _temperatura;
        if(temperatura >=25)
        	emit Instruction(termostato, "Violation");
        else emit reward(termostato, "Compliant");
    }
    
    function getTemperatura() public view returns (uint) {
        return temperatura;
    }
    
    function getIoT() public view returns (address, address) {
        return (sensor, termostato);
    }

}

