String.prototype.toDate = function(this: string): Date {
    return new Date(this);
};
