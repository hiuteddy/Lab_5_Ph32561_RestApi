var express = require("express");
const router = express.Router();

const Distributors = require("../models/distributors");
const Fruits = require("../models/fruits");
const Student = require('../models/student');

router.get('/get-list-distributor', async (req, res) => {
  try {
      const data = await Distributors.find().populate();
      res.json({
          "status": 200,
          "messenger": "Danh sách distributor",
          "data": data
      })
  } catch (error) {
      console.log(error);
  }
})
// Thêm nhà phân phối
router.post('/add-distributor', async (req, res) => {
  try {
    const data = req.body;
    const newDistributor = new Distributors({
      name: data.name
    });
    const result = await newDistributor.save();
    if (result) {
      res.json({
        "status": 200,
        "messenger": "Thêm thành công",
        "data": result
      });
    } else {
      res.json({
        "status": 400,
        "messenger": "Lỗi thêm không thành công",
        "data": []
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Xóa nhà phân phối
router.delete('/destroy-distributor-by-id/:id', async (req, res) => {
  try {
    const distributorId = req.params.id;
    const result = await Distributors.findByIdAndDelete(distributorId);
    if (result) {
      res.json({
        "status": 200,
        "messenger": "Xóa thành công",
        "data": result
      });
    } else {
      res.json({
        "status": 400,
        "messenger": "Lỗi xóa không thành công",
        "data": []
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Cập nhật thông tin nhà phân phối
router.put('/update-distributor-by-id/:id', async (req, res) => {
  try {
    const distributorId = req.params.id;
    const updateData = req.body;
    const result = await Distributors.findByIdAndUpdate(distributorId, updateData, { new: true });
    if (result) {
      res.json({
        "status": 200,
        "messenger": "Cập nhật thành công",
        "data": result
      });
    } else {
      res.json({
        "status": 400,
        "messenger": "Lỗi cập nhật không thành công",
        "data": []
      });
    }
  } catch (error) {
    console.log(error);
  }
});
//search Distributor
router.get('/search-distributor', async (req, res) => {
  try {
      const key = req.query.key;

      const data = await Distributors.find({ name: { "$regex": key, "$options": "i" } })
          .sort({ createdAt: -1 });

      if (data) {
          res.json({
              "status": 200,
              "messenger": "Thành công",
              "data": data
          });
      } else {
          res.json({
              "status": 400,
              "messenger": "Lỗi, không thành công",
              "data": []
          });
      }
  } catch (error) {
      console.log(error);
  }
});

// Tìm kiếm nhà phân phối





router.get("/get-list-fruit", async (req, res) => {
    try {
      const data = await Fruits.find().populate("id_distributor");
      res.json({
        status: 200,
        messenger: "Danh sách fruit",
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  });
router.post("/add-fruit", async (req, res) => {
  try {
    const data = req.body; // Lấy dữ liệu từ request body
    // Tạo một đối tượng Distributors mới từ dữ liệu trong request body

    const newfruit = new Fruits({
      name: data.name,
      studentId:data.studentId,
      gpa:data.gpa,
      avatarUrl:data.avatarUrl,
      // quantity: data.quantity,
      // price: data.price,
      // status: data.status,
      // image: data.image,
      // description: data.description,
      id_distributor: data.id_distributor
    });
    // Lưu đối tượng Distributors vào cơ sở dữ liệu
    const result = await newfruit.save();
    if (result) {
      res.json({
        status: 200,
        messenger: "Thêm thành công",
        data: result,
      });
    } else {
      res.json({
        status: 200,
        messenger: "Thêm không thành công",
        data: [],
      });
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.log(error);
    // Trả về lỗi nếu có lỗi xảy ra
  }
});
router.put("/update-fruit/:id", async (req, res) => {
  try {
    const fruitId = req.params.id;
    const data = req.body;
    const updatedFruit = await Fruits.findByIdAndUpdate(fruitId, data, {
      new: true,
    });
    if (updatedFruit) {
      res.json({
        status: 200,
        messenger: "Cập nhật thành công",
        data: updatedFruit,
      });
    } else {
      res.json({
        status: 404,
        messenger: "Không tìm thấy fruit",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      messenger: "Lỗi server",
      data: null,
    });
  }
});
router.delete("/delete-fruit/:id", async (req, res) => {
  try {
    const fruitId = req.params.id;
    const deletedFruit = await Fruits.findByIdAndDelete(fruitId);
    if (deletedFruit) {
      res.json({
        status: 200,
        messenger: "Xóa thành công",
        data: deletedFruit,
      });
    } else {
      res.json({
        status: 404,
        messenger: "Không tìm thấy fruit",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      messenger: "Lỗi server",
      data: null,
    });
  }
});

router.get("/get-fruit/:id", async (req, res) => {
  try {
    const fruitId = req.params.id;
    const fruit = await Fruits.findById(fruitId).populate("id_distributor");
    if (fruit) {
      res.json({
        status: 200,
        messenger: "Chi tiết fruit",
        data: fruit,
      });
    } else {
      res.json({
        status: 404,
        messenger: "Không tìm thấy fruit",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      messenger: "Lỗi server",
      data: null,
    });
  }
});

router.get("/get-fruits-by-price", async (req, res) => {
  try {
    const { price_start, price_end } = req.query;
    // Chuyển đổi price_start và price_end từ string sang number
    const minPrice = parseFloat(price_start);
    const maxPrice = parseFloat(price_end);

    // Kiểm tra nếu giá trị minPrice hoặc maxPrice không hợp lệ
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return res.status(400).json({
        status: 400,
        messenger: "Giá trị không hợp lệ",
        data: null,
      });
    }

    // Tìm kiếm các trái cây có giá nằm trong khoảng từ minPrice đến maxPrice
    const fruits = await Fruits.find({
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .sort({ quantity: -1 })
      .select("name quantity price id_distributor");

    res.json({
      status: 200,
      messenger: "Danh sách fruits",
      data: fruits,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      messenger: "Lỗi server",
      data: null,
    });
  }
});

router.get("/get-fruits-by-name", async (req, res) => {
  try {
    const fruits = await Fruits.find({
      name: { $regex: "^[AX]", $options: "i" },
    }).select("name quantity price id_distributor");
    res.json({
      status: 200,
      messenger: "Danh sách fruits",
      data: fruits,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      messenger: "Lỗi server",
      data: null,
    });
  }
});

module.exports = router;


// http://localhost:3000/api/get-fruits-by-price?price_start=1.5&price_end=2.5"status": 200,
// {
//     "_id": "65f39fdb7ea5590f56ffe1d7",
//     "name": "Google",
//     "price": 5.5,
//     "status": 1,
//     "quantity": 7,
//     "image": [
//         "Goole.jpg"
//     ],
//     "description": "Fresh and juicy Google",
   
// },