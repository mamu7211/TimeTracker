import { Router } from 'express';
import TimeRecordRepository from '../repository/in_memory_time_record_repository.js';
import TimeRecordService from '../service/time_record_service.js';

var router = Router();
var inMemoryRepo = new TimeRecordRepository();
var service = new TimeRecordService(inMemoryRepo);

router.get("/", (req, res) => {
    res.json(service.findAll());
});

router.post("/", (req, res) => {
    service.create(
        req.body,
        createdData => res.json(createdData),
        validationError => res.status(400).send(validationError)
    );
});

router.get("/:id", (req, res) => {
    service.findById(req.params.id,
        loadedData => res.json(loadedData),
        notFoundError => res.status(404).send(notFoundError)
    );
});

router.put("/:id", (req, res) => {
    service.update(
        req.params.id,
        req.body,
        updatedData => res.json(updatedData),
        validationError => res.status(400).send(validationError),
        notFoundError => res.status(404).send(notFoundError)
    );
})


export default router;
