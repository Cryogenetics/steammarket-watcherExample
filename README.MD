# steammarket-watcher Example
Very simple market watcher for CS2 knives, to monitor if a knife is being sold for very cheap in comparison to usual prices. Have noticed multiple instances of knives being sold for 4$ which is likely a stolen account.

## Warning
Usage of this script may result in temporary bans from steamcommunity.com, as they have ratelimits on how fast you can make requests if you exceed their limits.

## Usage:
```shell
git clone `https://github.com/Cryogenetics/steammarket-watcherExample.git`
cd steammarket-watcherExample
npm i

# if you want to have this run as a windows service on startup run 
node ./install.js
# if you want to manually start the script, run
node ./marketWatcher.js
```


