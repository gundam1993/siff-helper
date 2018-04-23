const graphql = require('graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema} = graphql

const FilmType = new GraphQLObjectType({
  name: 'Film',
  fields: () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    kind: {type: GraphQLString},
    time: {type: GraphQLInt}
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    film: {
      type: FilmType,
      args: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString}
      },
      resolve(parent, args) {
        // code to get data from db

      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})