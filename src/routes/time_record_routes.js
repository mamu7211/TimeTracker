import { Router } from 'express';
//import TimeRecordRepository from '../repository/in_memory_time_record_repository.js';
import MongoRepo from '../repository/mongo_repo.js';
import TimeRecordService from '../service/time_record_service.js';

var router = Router();
var service = new TimeRecordService(new MongoRepo);

router.get("/", (req, res) => {
    service.find(req.query,
        data => res.status(200).json(data),
        error => res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    );
});

router.get("/:id", (req, res) => {
    service.findById(req.params.id,
        data => res.status(200).json(data),
        notFoundError => res.status(404).send(notFoundError),
    );
});

router.post("/", (req, res) => {
    service.create(
        req.body,
        data => res.status(200).json(data),
        validationError => res.status(400).send(validationError)
    );
});

router.put("/:id", (req, res) => {
    service.update(
        req.params.id,
        req.body,
        data => res.status(200).json(data),
        notFoundError => res.status(404).send(notFoundError),
        validationError => res.status(400).send(validationError)
    )
});

router.delete("/:id", (req, res) => {
    service.delete(req.params.id,
        data => res.status(200).json(data),
        notFoundError => res.status(404).send(notFoundError));
});





// router.put("/:id", (req, res) => {
//     service.update(
//         req.params.id,
//         req.body,
//         updatedData => res.json(updatedData),
//         validationError => res.status(400).send(validationError),
//         notFoundError => res.status(404).send(notFoundError)
//     );
// })


export default router;
