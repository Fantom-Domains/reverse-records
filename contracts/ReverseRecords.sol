// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
pragma experimental ABIEncoderV2;
import "./Namehash.sol";
import '@ensdomains/ens/contracts/ENS.sol';
import '@ensdomains/ens/contracts/ReverseRegistrar.sol';
import '@ensdomains/resolver/contracts/Resolver.sol';

contract ReverseRecords {
    FNS fns;
    ReverseRegistrar registrar;

	// addr.reverse to hash
    bytes32 private constant ADDR_REVERSE_NODE = 0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2;

    /**
     * The `constructor` takes FNS registry address
     */
    constructor(FNS _fns) {
        fns = _fns;
        registrar = ReverseRegistrar(fns.owner(ADDR_REVERSE_NODE));
    }

    /**
     * Read only function to return fns name only if both forward and reverse resolution are set     *
     */
    function getNames(address[] calldata addresses) external view returns (string[] memory r) {
        r = new string[](addresses.length);
        for(uint i = 0; i < addresses.length; i++) {
            bytes32 nodeBytes = node(addresses[i]);
            address resolverAddress = fns.resolver(nodeBytes);
            if(resolverAddress != address(0x0)){
                Resolver resolver = Resolver(resolverAddress);
                string memory name = resolver.name(nodeBytes);
                if(bytes(name).length == 0 ){
                    continue;
                }
                bytes32 namehash = Namehash.namehash(name);
                address forwardResolverAddress = fns.resolver(namehash);
                if(forwardResolverAddress != address(0x0)){
                    Resolver forwardResolver = Resolver(forwardResolverAddress);
                    address forwardAddress = forwardResolver.addr(namehash);
                    if(forwardAddress == addresses[i]){
                        r[i] = name;
                    }
                }
            }
        }
        return r;
    }

    function node(address addr) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(ADDR_REVERSE_NODE, sha3HexAddress(addr)));
    }

    function sha3HexAddress(address addr) private pure returns (bytes32 ret) {
        addr;
        ret; // Stop warning us about unused variables
        assembly {
            let lookup := 0x3031323334353637383961626364656600000000000000000000000000000000

            for { let i := 40 } gt(i, 0) { } {
                i := sub(i, 1)
                mstore8(i, byte(and(addr, 0xf), lookup))
                addr := div(addr, 0x10)
                i := sub(i, 1)
                mstore8(i, byte(and(addr, 0xf), lookup))
                addr := div(addr, 0x10)
            }

            ret := keccak256(0, 40)
        }
    }
}