#!/bin/bash
sudo rm /etc/certs/devcert.pem && rm -rf ~/.config/devcert
# TODO - more sorcery to set port here due to this function https://github.com/davewasmer/devcert/blob/master/src/root-authority.ts#L176