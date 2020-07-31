const pushReferenceToDocument = (document, referenceId, referenceField) => {
  if (document[referenceField]) {
    let alreadyRegistered = false;

    document[referenceField].forEach((registeredReference) => {
      if (registeredReference._id === referenceId) alreadyRegistered = true;
    });

    if (!alreadyRegistered) document[referenceField].push(referenceId);
  } else {
    document[referenceField] = [referenceId];
  }

  return document;
};

module.exports = {
  pushReferenceToDocument,
};
