const pushReferenceToDocument = (document, reference, referenceField) => {
  if (document[referenceField]) {
    let alreadyRegistered = false;

    document[referenceField].forEach((registeredReference) => {
      if (registeredReference._id === reference._id) alreadyRegistered = true;
    });

    if (!alreadyRegistered) document[referenceField].push(reference._id);
  } else {
    document[referenceField] = [reference._id];
  }

  return document;
};

module.exports = {
  pushReferenceToDocument,
};
