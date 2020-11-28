module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :entries, [EntryType], null: true,
      description: "Array of user entries"
    def entries()
      context[:current_user].entries.order(:created_at)
    end
  end
end
