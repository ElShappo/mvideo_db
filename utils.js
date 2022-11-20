const {faker} = require('@faker-js/faker');
const { Sequelize, Model, DataTypes, INTEGER } = require("sequelize");

let sequelize = new Sequelize('mvideo_orm_2', 'postgres', 'mypass1', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports.retrieveArray = function(primaryTable, pk="id") {
  // retrieves the array of indices from the passed ORM model (primaryTable)
    let arr = [];
    for (let i=0; i<primaryTable.length; ++i) {
        arr.push(primaryTable.at(i)[pk]);
    }
    console.log("Array: ", arr);
    return arr;
}

module.exports.createCategoryItems = function(arr, available_item_ids) {
  // template function to create items of various categories (tvs, video_recorders...) with unique ids
  // arr - previously generated array of elements of the same category (array of tvs, video_recorders... (without ids))
  // available_item_ids - self-explanatory

  for (let i=0; i<arr.length; ++i) {
    let randomId = faker.helpers.arrayElement(available_item_ids);
    let indexOfRandomId = available_item_ids.indexOf(randomId);
    available_item_ids.splice(indexOfRandomId, 1);
    arr[i] = Object.assign({id: randomId}, arr[i]);
  }
  return arr;
}

let User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    patronymic: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
    },
    date_of_birth: {
        type: DataTypes.DATE
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING
    },
    extra_phone: {
        type: DataTypes.STRING
    }

  },
  {timestamps: false,});

  let Address_book = sequelize.define("address_book", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    
        references: {
          model: User,
          key: 'id',
        }
    },
    city: {
        type: DataTypes.STRING
    },
    street: {
        type: DataTypes.STRING
    },
    building: {
        type: DataTypes.STRING
    },
    entrance: {
        type: DataTypes.STRING
    },
    apartment: {
        type: DataTypes.STRING
    },
    commentary: {
        type: DataTypes.STRING 
    }
  },
  {timestamps: false,});

  let Manufacturer = sequelize.define("manufacturer", {
    name: {
        type: DataTypes.STRING
    },
  },
  {timestamps: false,});

  let Item = sequelize.define("item", {
    price: {
        type: DataTypes.FLOAT
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    manufacturer_id: {
        type: DataTypes.INTEGER,
    
        references: {
          model: Manufacturer,
          key: 'id',
        }
    },
  },
  {timestamps: false,});

  let Cart = sequelize.define("cart", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    
        references: {
          model: User,
          key: 'id',
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    
        references: {
          model: Item,
          key: 'id',
        }
    },
    item_quantity: {
        type: DataTypes.INTEGER
    }

  },
  {timestamps: false,});

  let Store = sequelize.define("store", {
    city: {
        type: DataTypes.STRING
    },
    street: {
        type: DataTypes.STRING
    }
  },
  {timestamps: false,});

  let Favourite_item = sequelize.define("favourite_item", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: User,
        key: 'id',
      }
  },
    item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    
        references: {
          model: Item,
          key: 'id',
        }
    },
  },
  {timestamps: false,});

  let Favourite_store = sequelize.define("favourite_store", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    
        references: {
          model: User,
          key: 'id',
        }
    },
    store_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    
        references: {
          model: Store,
          key: 'id',
        }
    },
  },
  {timestamps: false,});

  let Order = sequelize.define("order", {
    user_id: {
        type: DataTypes.INTEGER,
    
        references: {
          model: User,
          key: 'id',
        }
    },
    order_address: {
        type: DataTypes.STRING,
    },
    order_date: {
      type: DataTypes.DATE,
    },
    delivery_method: {
      type: DataTypes.STRING,
    },
    order_price: {
      type: DataTypes.FLOAT,
    },
    payment_method: {
      type: DataTypes.STRING,
    }
  },
  {timestamps: false,});

  let Items_within_store = sequelize.define("items_within_store", {
    store_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Store,
        key: 'id',
      }
    },
    item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    
        references: {
          model: Item,
          key: 'id',
        }
    },
    item_quantity: {
      type: DataTypes.INTEGER
    }
  },
  {timestamps: false,});

  let Items_within_order = sequelize.define("items_within_order", {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Order,
        key: 'id',
      }
    },
    item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    
        references: {
          model: Item,
          key: 'id',
        }
    },
    item_quantity: {
      type: DataTypes.INTEGER
    }
  },
  {timestamps: false,});

  let Video_recorder = sequelize.define("video_recorder", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    fps: {
        type: DataTypes.STRING(100),
    },
    viewing_angle: {
      type: DataTypes.INTEGER,
    },
    max_frame_frequency: {
      type: DataTypes.INTEGER,
    },
    max_resolution: {
      type: DataTypes.INTEGER,
    },
    is_night_shooting: {
      type: DataTypes.BOOLEAN,
    },
    recording_interval: {
      type: DataTypes.STRING(10),
    },

  },
  {timestamps: false,});

  let Tv = sequelize.define("tv", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    is_hdr: {
      type: DataTypes.BOOLEAN
    },
    is_smarttv: {
      type: DataTypes.BOOLEAN
    },
    is_bluetooth_module: {
      type: DataTypes.BOOLEAN
    },
    os: {
      type: DataTypes.TEXT
    },
    is_wifi: {
      type: DataTypes.BOOLEAN
    },
  },
  {timestamps: false,});

  let Tablet = sequelize.define("tablet", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    display_size: {
      type: DataTypes.FLOAT
    },
    rom_size: {
      type: DataTypes.INTEGER
    },
    ram_size: {
      type: DataTypes.INTEGER
    },
    cores_number: {
      type: DataTypes.INTEGER
    },
    cpu_frequency: {
      type: DataTypes.FLOAT
    },
    bluetooth_module: {
      type: DataTypes.INTEGER
    },
    internet_standard: {
      type: DataTypes.STRING
    }
  },
  {timestamps: false,});

  let System_unit = sequelize.define("system_unit", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    cpu_type: {
      type: DataTypes.STRING
    },
    ram_size: {
      type: DataTypes.INTEGER
    },
    video_card: {
      type: DataTypes.STRING,
    },
    ssd_size: {
      type: DataTypes.INTEGER
    },
    vram_size: {
      type: DataTypes.INTEGER
    },
    os: {
      type: DataTypes.TEXT
    },
    guarantee_period: {
      type: DataTypes.INTEGER
    }
  },
  {timestamps: false,});

  let Smartphone = sequelize.define("smartphone", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    display: {
      type: DataTypes.FLOAT
    },
    cpu_type: {
      type: DataTypes.STRING
    },
    rom: {
      type: DataTypes.INTEGER,
    },
    camera_quality: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
  },
  {timestamps: false,});

  let Laptop = sequelize.define("laptop", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    display_resolution: {
      type: DataTypes.STRING
    },
    cpu_type: {
      type: DataTypes.TEXT
    },
    ssd_size: {
      type: DataTypes.INTEGER,
    },
    os: {
      type: DataTypes.STRING
    },
    video_card_type: {
      type: DataTypes.TEXT
    },
    ram_size: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    }
  },
  {timestamps: false,});

  let Hoover = sequelize.define("hoover", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    suction_power: {
      type: DataTypes.INTEGER
    },
    nozzles_number: {
      type: DataTypes.INTEGER
    },
    power_cord_length: {
      type: DataTypes.INTEGER
    },
    power_consumption: {
      type: DataTypes.INTEGER
    },
    is_upright: {
      type: DataTypes.BOOLEAN
    },
    weight: {
      type: DataTypes.INTEGER
    },
    guarantee_period: {
      type: DataTypes.INTEGER
    }

  },
  {timestamps: false,});

  let Headphone = sequelize.define("headphone", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    connection_type: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    },
    min_frequency: {
      type: DataTypes.INTEGER
    },
    max_frequency: {
      type: DataTypes.INTEGER
    },
    sensitivity: {
      type: DataTypes.INTEGER
    },
    ear_pads_material: {
      type: DataTypes.STRING
    },
    guarantee_period: {
      type: DataTypes.INTEGER
    },
    is_headset: {
      type: DataTypes.BOOLEAN
    }

  },
  {timestamps: false,});

  let Grinder = sequelize.define("grinder", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    max_wheel_diameter: {
      type: DataTypes.INTEGER
    },
    landing_hole_diameter: {
      type: DataTypes.FLOAT
    },
    max_rotation_speed: {
      type: DataTypes.INTEGER
    },
    power_consumption: {
      type: DataTypes.INTEGER
    },
    guarantee_period: {
      type: DataTypes.INTEGER
    },
    wheels_number: {
      type: DataTypes.INTEGER
    }


  },
  {timestamps: false,});

  let Game_console = sequelize.define("game_console", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    ssd_size: {
      type: DataTypes.INTEGER
    },
    is_hdr: {
      type: DataTypes.BOOLEAN
    },
    wifi: {
      type: DataTypes.STRING(50)
    },
    guarantee_period: {
      type: DataTypes.INTEGER
    },
    is_wireless_gamepad: {
      type: DataTypes.BOOLEAN
    }
  },
  {timestamps: false,});

  let Fridge = sequelize.define("fridge", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    color: {
      type: DataTypes.STRING
    },
    freezer_volume: {
      type: DataTypes.INTEGER
    },
    cooling_chamber_volume: {
      type: DataTypes.INTEGER
    },
    is_freezer_frost: {
      type: DataTypes.BOOLEAN
    },
    is_cooling_frost: {
      type: DataTypes.BOOLEAN
    },
    is_indication: {
      type: DataTypes.BOOLEAN
    },
    regulated_shelves_number: {
      type: DataTypes.INTEGER
    },
    control_type: {
      type: DataTypes.STRING
    }
  },
  {timestamps: false,});

  let Camera = sequelize.define("camera", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
      references: {
        model: Item,
        key: 'id',
      }
    },
    matrix_resolution: {
      type: DataTypes.FLOAT
    },
    zoom: {
      type: DataTypes.FLOAT
    },
    matrix_size: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    focus_min: {
      type: DataTypes.INTEGER
    },
    focus_max: {
      type: DataTypes.INTEGER
    },
    quality: {
      type: DataTypes.STRING(100)
    },
    matrix_type: {
      type: DataTypes.STRING(50)
    },
    frame_frequency: {
      type: DataTypes.INTEGER
    },
    is_wifi: {
      type: DataTypes.BOOLEAN
    }

  },
  {timestamps: false,});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  try {
    await sequelize.sync();
    console.log("Tables have been synced!");
  } catch (error) {
    console.error("Unable to sync tables", error);
  }
})();

    module.exports.User = User;
    module.exports.Address_book = Address_book;
    module.exports.Manufacturer = Manufacturer;
    module.exports.Item = Item;
    module.exports.Cart = Cart;
    module.exports.Store = Store;
    module.exports.Favourite_item = Favourite_item;
    module.exports.Favourite_store = Favourite_store;
    module.exports.Order = Order;
    module.exports.Items_within_store = Items_within_store;
    module.exports.Items_within_order = Items_within_order;
    module.exports.Video_recorder = Video_recorder;
    module.exports.Tv = Tv;
    module.exports.Tablet = Tablet;
    module.exports.System_unit = System_unit;
    module.exports.Smartphone = Smartphone;
    module.exports.Laptop = Laptop;
    module.exports.Hoover = Hoover;
    module.exports.Headphone = Headphone;
    module.exports.Grinder = Grinder;
    module.exports.Game_console = Game_console;
    module.exports.Fridge = Fridge;
    module.exports.Camera = Camera;
