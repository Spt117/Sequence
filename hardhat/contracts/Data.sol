// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

contract Data {
    string public data ;

    event NewData(string newData);

    function setData(string memory _string) public {
        data = _string;
        emit NewData(_string);
    }
}