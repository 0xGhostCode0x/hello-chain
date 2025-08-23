// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title GhostCounter — a delightfully haunted counter
contract GhostCounter {
    /// @notice Current ectoplasm count
    uint256 public ectoplasms;

    /// @dev Cheap custom error for underflow
    error Underflow();

    /// @notice Emitted after a successful haunt (increment)
    event Haunted(address indexed by, uint256 newCount);

    /// @notice Emitted after a successful exorcise (decrement)
    event Exorcised(address indexed by, uint256 newCount);

    /// @notice Emitted when the counter is reset to zero
    event Reset(address indexed by);

    /// @notice Increment the ectoplasm counter
    function haunt() external {
        unchecked { ectoplasms += 1; }           // 0.8+ has built-in checks; unchecked saves a touch of gas
        emit Haunted(msg.sender, ectoplasms);
    }

    /// @notice Decrement the ectoplasm counter, reverting at zero
    function exorcise() external {
        if (ectoplasms == 0) revert Underflow();
        unchecked { ectoplasms -= 1; }
        emit Exorcised(msg.sender, ectoplasms);
    }

    /// @notice Reset the ectoplasm counter to zero
    function reset() external {
        ectoplasms = 0;
        emit Reset(msg.sender);
    }
}
