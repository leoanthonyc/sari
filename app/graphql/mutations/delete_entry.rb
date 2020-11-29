module Mutations
  class DeleteEntry < Mutations::BaseMutation
    null true

    argument :id, ID, required: false

    field :success, Boolean, null: false
    field :errors, [String], null: false

    def resolve(id:)
      user = context[:current_user]
      entry = user.entries.find(id)
      if entry.destroy
        # Successful creation, return the created object with no errors
        {
          success: true,
          errors: [],
        }
      else
        # Failed save, return the errors to the client
        {
          success: false,
          errors: entry.errors.full_messages
        }
      end
    end
  end
end