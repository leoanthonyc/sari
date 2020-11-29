class AddTagsToEntries < ActiveRecord::Migration[6.0]
  def change
    add_column :entries, :tags, :text
  end
end
