'use strict'

const Hash = use('Hash')
const Model = use('Model')

class User extends Model {

  //设置管理员表名
  static get table() {
    return 'ni_admin_user'
  }

  //设置表主键为ni_id
  static get primaryKey() {
    return 'ni_id'
  }


  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
