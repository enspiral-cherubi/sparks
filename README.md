
# sparks

30 node clusters floating in an invisible container. each cluster contains 3 nodes, and links between the nodes. the lengths of the three links in each cluster correspond to the (1) frequency of an audio signal (between 20 - 5000 hz), (2) cutoff frequency of a moog-like filter, (3) resonance of said moog-like filter.

## how

### install

```
git clone https://github.com/data-doge/sparks
cd 
npm install
```

## develop

```
npm start
```

browse to <http://localhost:9966/>.

## test

```
npm test
```

## deploy

```
npm run deploy
```
