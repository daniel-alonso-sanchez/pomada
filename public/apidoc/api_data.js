define({ "api": [
  {
    "type": "get",
    "url": "/api/jobs/pending/status/:type",
    "title": "Request pending jobs by status type",
    "name": "getPendingJobsByStatusType",
    "group": "Pending",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "'active'",
              "'complete'",
              "'failed'",
              "'wait'",
              "'delayed'"
            ],
            "optional": false,
            "field": "status",
            "description": "<p>type</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>tells if request was successfull or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>detailed message</p>"
          }
        ]
      }
    },
    "filename": "controllers/jobs.js",
    "groupTitle": "Pending"
  }
] });
