# frozen_string_literal: true

module Types
  # Graphql Type for Entry model
  class EntryType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :value, String, null: false
    field :tags, [String], null: true

    def tags
      object.tags.split(',')
    end
  end
end
