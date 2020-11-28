class ChangeValueToText < ActiveRecord::Migration[6.0]
  def change
    change_column :entries, :value, :text
  end
end
